import Block from '../../core/Block';

export class Page404 extends Block<object> {
  protected render(): string {
    return `
      <div class="container flex-column">
        {{{ Title className="title__error" text="404" }}}
        <p class="text-center">Не туда попали</p>
        {{{ Link label="Назад к чатам" className="link__back" }}}
      </div>
    `;
  }
}
