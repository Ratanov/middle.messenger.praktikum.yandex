import Chat, { IChatProps } from '../../components/chat/chat';
import Block from '../../core/Block';
import { routes } from '../../core/app/withRoutes';
import Router from '../../core/router/Router';
import { TEvents } from '../../core/types';

interface IMessengerProps {
  onProfile?: Partial<TEvents>;
  onChangeChat?: (data: IChatProps) => void;
}

type Ref = {
  chat: Chat;
};

export class Messenger extends Block<IMessengerProps, Ref> {
  constructor() {
    super({
      onProfile: {
        click: () => {
          Router.go(routes.profile.route)
        },
      },
    });

    window.onChangeChat = this.onChangeChat.bind(this);
  }

  private onChangeChat(data: IChatProps) {
    console.log('onChangeChat', data)
    this.refs.chat.setProps({ ...data });
  }

  protected render(): string {
    return `
      <div class="messenger flex">
        <div class="messenger__left">
          {{{ Button name="profile" label="Профиль" events=onProfile }}}

          {{{ ChatList }}}
        </div>

        <div class="messenger__border"></div>

        <div class="messenger__right">
          {{{ Chat ref="chat" }}}
        </div>
      </div>
    `;
  }
}
