import Block from '../../core/Block';
import { TEvents } from '../../core/types/api';

export interface IModalProps {
  events?: Partial<TEvents>;
}

type Ref = {
  modal: HTMLDivElement;
};

export default class Modal extends Block<IModalProps, Ref> {
  constructor(props: IModalProps) {
    super({
      ...props,
      events: {
        click: (e) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains('modal-backdrop')) {
            this.close();
          }
        },
      },
    });
  }

  public open() {
    this.refs.modal?.classList.add('modal-backdrop--active');
  }

  public close() {
    this.refs.modal?.classList.remove('modal-backdrop--active');
  }

  protected render(): string {
    return '<div class="modal-backdrop" ref="modal"></div>'
  }
}
