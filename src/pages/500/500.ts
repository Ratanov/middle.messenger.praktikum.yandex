import Block from '../../core/Block';

export class Page500 extends Block<object> {
  protected render(): string {
    return `
        <div class="container flex-column">
            {{{ Title className="title__error" text="500" }}}
            <p class="text-center">Не туда попали</p>
            {{{ Link url="/" className="link__back" text="Мы уже фиксим" }}}
        </div>
    `;
  }
}