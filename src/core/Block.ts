import Handlebars from 'handlebars';
import EventBus from './EventBus';
import { nanoid } from 'nanoid';
import { IChildren } from './registerComponent';
import { TEvents } from './types/api';
import { isEqualObjects } from './utilities'

export type RefType = {
  [key: string]: Element | Block<object>;
};

export interface BlockClass<P extends object, R extends RefType> {
  new (props: P): Block<P, R>;
  componentName?: string;
}

type TContextAndStubs<Props extends object, R extends RefType> = {
  __refs: RefType;
  __children: IChildren<Props, R>[];
} & Props;

class Block<
  Props extends object & { events?: Partial<TEvents> },
  Refs extends RefType = RefType,
> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(6);
  protected props: Props & { events?: Partial<TEvents> };
  protected refs: Refs = {} as Refs;
  private children: Block<object>[] = [];
  private eventBus: () => EventBus<string>;
  private _element: HTMLElement | null = null;

  constructor(props: Props = {} as Props & { events?: Partial<TEvents> }) {
    const eventBus = new EventBus();
    this.id = nanoid(6);
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  /**
   * Добавление события к элементу на основе предложенных свойств.
   *
   */
  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      const callback = events[eventName as keyof TEvents] as EventListener;
      this._element!.addEventListener(eventName, callback);
    });
  }

  /**
   * Регистрация события на шине событий.
   *
   * @param {EventBus} eventBus - шина событий, на которой нужно зарегистрировать события.
   * @return {void}
   */
  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  /**
   * Инициализирует блок.
   */
  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount() {
    this._checkInDom();
    this.componentDidMount();
  }

  componentDidMount() {}

  /**
   * Отправка события componentDidMount и вызов метода componentDidMount для каждого дочернего компонента.
   */
  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) =>
      child.dispatchComponentDidMount(),
    );
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  /**
   * Метод жизненного цикла, вызываемый после выполнения обновления.
   *
   * @param {Props} oldProps - старые `props` до обновления.
   * @param {Props} newProps - новые `props` после обновления.
   * @return {boolean} флаг для указания, что старые `props` не равны новым `props`.
   */
  protected componentDidUpdate(oldProps: Props, newProps: Props) {
    return !isEqualObjects(oldProps, newProps);
  }

  /**
   * Helper для проверки присутствия элемента в DOM дереве.
   * Если элемента нет, вызывается событие COMPONENT_WILL_UNMOUNT
   */
  _checkInDom() {
    const elementInDOM = document.body.contains(this._element);

    if (elementInDOM) {
      setTimeout(() => this._checkInDom(), 1000);
      return;
    }

    this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
  }

  _componentWillUnmount() {
    this.componentWillUnmount();
  }

  componentWillUnmount() {
    const { events } = this.props;

    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      const callback = events[eventName as keyof TEvents] as EventListener;
      this._element!.removeEventListener(eventName, callback);
    });
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.compile(this.render(), this.props);

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  private compile(template: string, context: Props) {
    const contextAndStubs: TContextAndStubs<Props, Refs> = {
      ...context,
      __refs: this.refs,
      __children: [],
    };

    const html = Handlebars.compile(template)(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    const fragment: DocumentFragment = temp.content;

    this.refs = Array.from(fragment.querySelectorAll('[ref]')).reduce(
      (list, element) => {
        const key = element.getAttribute('ref')!;
        list[key] = element as HTMLElement;
        element.removeAttribute('ref');
        return list;
      },
      contextAndStubs.__refs,
    ) as Refs;

    contextAndStubs.__children?.forEach(({ embed }) => {
      embed(temp.content);
    });

    return temp.content;
  }

  protected render(): string {
    return '';
  }

  getContent() {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.dispatchComponentDidMount();
        }
      }, 100);
    }

    return this._element;
  }

  _makePropsProxy(props: Props) {
    // eslint-disable-next-line
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof Props];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target, prop, value) {
        const oldTarget = JSON.parse(JSON.stringify(target)) as Props;

        target[prop as keyof Props] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }
}

export default Block;
