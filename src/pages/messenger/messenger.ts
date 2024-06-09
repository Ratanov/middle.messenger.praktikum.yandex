import Block from '../../core/Block';
import { Chat, ChatList } from '../../components';
import { IChatProps } from '../../components/chat';
import { routes } from '../../core/app/withRoutes';
import Router from '../../core/router/Router';
import { TEvents } from '../../core/types/api';

interface IMessengerProps {
  onProfile?: Partial<TEvents>;
  onChangeChat?: (data: IChatProps) => void;
}

type Ref = {
  chatList: ChatList;
  chat: Chat;
};

export class Messenger extends Block<IMessengerProps, Ref> {
  constructor() {
    super({
      onProfile: {
        click: () => {
          Router.go(routes.profile.route);
        },
      },
    });

    window.onChangeChat = this.onChangeChat.bind(this);
  }

  private onChangeChat(data: IChatProps) {
    this.refs.chat.setProps({ ...data });
  }

  protected render(): string {
    return `
      <div class="messenger flex">
        <div class="messenger__left">
          {{{ Button name="profile" label="Профиль" events=onProfile }}}

          {{{ ChatList ref="chatList" }}}
        </div>

        <div class="messenger__border"></div>

        <div class="messenger__right">
          {{{ Chat ref="chat" }}}
        </div>
      </div>
    `;
  }
}
