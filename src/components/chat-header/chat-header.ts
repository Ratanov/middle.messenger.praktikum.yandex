import Block from '../../core/Block';
import { IChat, TEvents } from '../../core/types/api';
import { Input, Modal } from '../';
import { api } from '../../core/api';

export interface TChatHeaderProps {
  chatConfig?: IChat.GETChatsResponse;
  events?: Partial<TEvents>;
  onAddUserModalOpen?: Partial<TEvents>;
  onAddUser?: Partial<TEvents>;
  onDeleteUserModalOpen?: Partial<TEvents>;
  onDeleteChat?: Partial<TEvents>;
  users?: Array<IChat.GetChatUsersResponse & { events?: Partial<TEvents> }>;
  closeModal?: Partial<TEvents>;
}

type Ref = {
  input: HTMLInputElement;
  addUserModal?: Modal;
  deleteUserModal?: Modal;
  inputLogin: Input;
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
      onAddUserModalOpen: {
        click: (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.refs?.addUserModal?.open();
        },
      },
      onAddUser: {
        click: () => {
          const value = this.refs.inputLogin?.value();

          api
            .searchUser({ login: value })
            .then((data) => {
              if (!data.length || !props.chatConfig?.id) {
                this.refs.inputLogin?.setError('Пользователь не найден');
              } else {
                api
                  .addUserToChat({
                    chatId: props.chatConfig.id,
                    users: [data[0].id],
                  })
                  .then(() => {
                    this.refs.addUserModal?.close();
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }
            })
            .catch((err) => {
              console.error(err);
            });
        },
      },
      onDeleteUserModalOpen: {
        click: (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.refs.deleteUserModal?.open();
        },
      },
      onDeleteChat: {
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
      closeModal: {
        click: () => {
          this.refs.addUserModal?.close();
          this.refs.deleteUserModal?.close();
        },
      },
    });
  }

  private loadUsers() {
    const chatId = this.props.chatConfig?.id;
    if (chatId) {
      api
        .getChatUsers({ id: chatId })
        .then((data) => {
          this.setProps({
            users: data
              .map((user) => ({
                ...user,
                events: {
                  click: () => {
                    api
                      .deleteChatUsers({ users: [user.id], chatId })
                      .then(() => {
                        this.setProps({
                          users: this.props.users?.filter(
                            (u) => u.id !== user.id,
                          ),
                        });
                      })
                      .catch((err) => {
                        console.error(err);
                      });
                  },
                },
              }))
              .filter((u) => u.role !== 'admin'),
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  protected render(): string {
    const { chatConfig } = this.props;
    this.loadUsers();
    return `
      <div class="chat__header px-5">
        <div class="flex align-center">
          <div class="chat__avatar">
            <label for="chat-avatar">
              <img src="${
                chatConfig?.avatar
                  ? `https://ya-praktikum.tech/api/v2/resources${chatConfig?.avatar}`
                  : 'assets/img/avatar.jpg'
              }" alt="${chatConfig?.title} avatar" class="chats-content-header__profile__image">
            </label>
            <input id="chat-avatar" type="file" ref="input" class="d-none">
          </div>
          {{{ Title text="${chatConfig?.title}" className="ml-2" }}}
        </div>

        <div>
          {{{ Link img="/assets/svg/plus.svg" label="Добавить пользователя" className="ml-2" events=onAddUserModalOpen }}}
          {{{ Link img="/assets/svg/cross.svg" label="Удалить пользователя" className="ml-2" events=onDeleteUserModalOpen }}}
          {{{ Link img="/assets/svg/cross.svg" label="Удалить чат" className="ml-2" events=onDeleteChat }}}
        </div>
        
        {{#Modal ref="addUserModal" }}
          <div class="modal">
            <div class="modal__header">
              <h3 class="mb-2">Добавить пользователя</h3>
            </div>
            <div class="modal__body">
              {{# Form className="profile__list" }}
                {{{ Input
                    ref="inputLogin"
                    label="Логин пользователя"
                    name="chat_find_user"
                    type="text"
                }}}
                {{{ Button
                    label="Добавить"
                    name="chat_add_user"
                    className="button-primary"
                    events=onAddUser
                }}}
                {{{ Button
                    label="Закрыть"
                    name="close_add_user_modal"
                    className="mt-2"
                    events=closeModal
                }}}
              {{/Form}}
            </div>
          </div>
        {{/Modal}}

        {{#Modal ref="deleteUserModal" }}
          <div class="modal">
            <div class="modal__header">
              <h3 class="mb-2">Удалить пользователя</h3>
            </div>
            <div class="modal__body">
              {{# Form }}
                {{#each users}}
                  <div>
                    {{{ Link label=this.login events=this.events }}}
                   </div>
                {{/each}}

                {{{ Button
                    label="Закрыть"
                    name="close_delete_user_modal"
                    events=closeModal
                }}}
              {{/Form}}
            </div>
          </div>
        {{/Modal}}
      </div>
    `;
  }
}
