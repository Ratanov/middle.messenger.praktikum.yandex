import Block from '../../core/Block';
import { IChat, TEvents } from '../../core/types/api';
import { Modal } from '../';
import { api } from '../../core/api';

export interface TChatHeaderProps {
  chatConfig?: IChat.GETChatsResponse;
  events?: Partial<TEvents>;
  onDeleteChatEvents?: Partial<TEvents>;
  onAddUserEvents?: Partial<TEvents>;
  onDelUserEvents?: Partial<TEvents>;
  closeModal?: () => void;
}

type Ref = {
  input: HTMLInputElement;
  addUserModal?: Modal;
  delUserModal?: Modal;
};

export default class ChatHeader extends Block<TChatHeaderProps, Ref> {
  constructor(props: TChatHeaderProps) {
    super({
      ...props,
      events: {
        change: (e) => {
          const chatId = this.props.chatConfig?.id;
          const input = e.target as HTMLInputElement;
          if (input?.files?.[0]) {
            const formData = new FormData();
            formData.append('avatar', input.files[0]);
            formData.append('chatId', String(chatId));
            api
              .changeChatAvatar(formData)
              .then((data) => {
                this.setProps({
                  chatConfig: data,
                });
              })
              .then(() => {
                window.updateChatList();
              })
              .catch((err) => {
                console.error(err);
              });
          }
        },
      },
      onDeleteChatEvents: {
        click: () => {
          const chatId = this.props.chatConfig?.id;
          if (chatId) {
            api
              .deleteChat({ chatId })
              .then(() => {
                window.updateChatList();
                window.onChangeChat({ isChatOpen: false });
              })
              .catch((err) => {
                console.error(err);
              });
          }
        },
      },
      onAddUserEvents: {
        click: () => {
          this.refs.addUserModal?.open();
        },
      },
      onDelUserEvents: {
        click: () => {
          this.refs.delUserModal?.open();
        },
      },
      closeModal: () => {
        this.refs.addUserModal?.close();
        this.refs.delUserModal?.close();
      },
    });
  }

  protected render(): string {
    const { chatConfig } = this.props;
    return `
      <div class="chat__header px-5">
        <div class="flex align-center">
          <div class="chat__avatar">
            <img src="${
              chatConfig?.avatar
                ? `https://ya-praktikum.tech/api/v2/resources${chatConfig?.avatar}`
                : 'assets/img/avatar.jpg'
            }" alt="${chatConfig?.title} avatar" class="chats-content-header__profile__image">
          </div>
          {{{ Title text=${chatConfig?.title} className="ml-2" }}}
        </div>
        {{{ Button name="popup_user" className="button__icon button__menu popup-trigger" }}}
        {{{ Popup id="popup_user" position="bottom" }}}
      </div>
    `;
  }
}
