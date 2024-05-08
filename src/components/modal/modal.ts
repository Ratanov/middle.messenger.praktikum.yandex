import Block from '../../core/Block';

interface IModalProps {}

export default class Modal extends Block<IModalProps> {
  constructor(props: IModalProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div id="{{id}}" class="modal-backdrop">
        <div class="modal">
          <a class="modal__close" href="#">❌</a>
          <div class="text-center">
            {{{ Title text=title className=titleClassName }}}
          </div>
          <div class="my-5 py-5 font-13 text-center">
            <!-- Для смены аватара -->
            {{#if upload}}
              {{{ Link label="Выбрать файл на компьютере" }}}
            {{/if}}

            {{#if img}}
              загруженная картинка
            {{/if}}

            <!-- Для добавления пользователя -->
            {{#ifEqual id "modal_add_user"}}
              {{{ Input label="Логин" name="login" }}}
            {{/ifEqual}}

            <!-- Для удаления пользователя -->
            {{#ifEqual id "modal_remove_user"}}
              {{{ Input label="Логин" name="login" }}}
            {{/ifEqual}}
        </div>
        {{#if button}}
          {{{ Button name="modal-btn" type="primary" label=button }}}
        {{/if}}
        {{#if bottom}}
          <div class="{{bottomClassName}}">{{bottom}}</div>
        {{/if}}
        </div>
      </div>
    `
  }
}
