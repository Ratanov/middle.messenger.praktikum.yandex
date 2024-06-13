import { expect } from 'chai';
import sinon from 'sinon';
import Block from './Block';
import { TEvents } from './types/api';

interface Props {
  text?: string;
  events?: Partial<TEvents>;
}

describe('Block', () => {
  let PageClass: typeof Block<Props>;

  before(() => {
    class Page extends Block<Props> {
      constructor(props: Props) {
        super({
          ...props,
        });
      }

      protected render(): string {
        return `
          <div>
            <button id="testButton">{{text}}</button>
          </div>
        `;
      }
    }

    PageClass = Page;
  });

  it('Block class constructor (Конструктор класса Block)', () => {
    const text = 'Hello Block class constructor';
    const pageComponent = new PageClass({ text });
    const spanText =
      pageComponent.element?.querySelector('#testButton')?.innerHTML;
    expect(spanText).to.be.eq(text);
  });

  it('Props reactivity (Реактивность пропсов)', () => {
    const text = 'submit';
    const pageComponent = new PageClass({ text: 'Props reactivity button' });
    pageComponent.setProps({ text });
    const spanText =
      pageComponent.element?.querySelector('#testButton')?.innerHTML;
    expect(spanText).to.be.eq(text);
  });

  it('The transmitted events are assigned to the component (Передаваемые события навешиваются на компонент)', () => {
    const handlerStub = sinon.stub();
    const pageComponent = new PageClass({
      events: {
        click: handlerStub,
      },
    });
    const event = new MouseEvent('click');
    pageComponent.element?.dispatchEvent(event);
    expect(handlerStub.calledOnce).to.be.true;
  });

  it('The component calls the dispatchComponentDidMount method (Компонент вызывает метод dispatchComponentDidMount)', () => {
    const clock = sinon.useFakeTimers();
    const pageComponent = new PageClass();
    const spyCDM = sinon.spy(pageComponent, 'componentDidMount');
    const element = pageComponent.getContent();
    document.body.append(element!);
    clock.next();
    expect(spyCDM.calledOnce).to.be.true;
  });
});
