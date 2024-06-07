import Block from '../../core/Block';
import { routes } from '../../core/app/withRoutes';
import Router from '../../core/router/Router';
import { TEvents } from '../../core/types';

interface IMessengerProps {
  onProfile?: Partial<TEvents>;
  isChatOpen?: boolean;
}

export class Messenger extends Block<IMessengerProps> {
  constructor() {
    super({
      onProfile: {
        click: () => {
          Router.go(routes.profile.route)
        },
      },
    });
  }

  protected render(): string {
    const { isChatOpen } = this.props;
    return `
      <div class="messenger flex">
        <div class="messenger__left">
          {{{ Button name="profile" label="Профиль" events=onProfile }}}

          {{{ ChatList }}}
          
        </div>

        <div class="messenger__border"></div>

        <div class='messenger__right${isChatOpen ? '': '--no-chat'}'>
          ${isChatOpen ? `{{{ Chat }}}` : '<div>Выберите чат чтобы отправить сообщение</div>'}
        </div>

        {{{ Modal id="modal_add_user" title="Добавить пользователя" button="Добавить" }}}
        {{{ Modal id="modal_remove_user" title="Удалить пользователя" button="Удалить" }}}
      </div>
    `;
  }
}
