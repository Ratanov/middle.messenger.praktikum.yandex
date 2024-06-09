import Block from '../../core/Block';
import { api } from '../../core/api';
import { IChat, TEvents } from '../../core/types';
import { Input, Modal } from '..';

interface IChatListProps {
  chats?: Array<IChat.GETChatsResponse & Partial<TEvents>>;
  events?: Partial<TEvents>;
  onModalOpen?: Partial<TEvents>;
  onChatCreate?: Partial<TEvents>;
}

type Ref = {
  modal: Modal;
  inputTitle: Input;
  search: HTMLInputElement;
};

export default class ChatList extends Block<IChatListProps, Ref> {
  constructor(props: IChatListProps) {
    super({
      ...props,
      onModalOpen: { click: () => this.refs?.modal?.open() },
      onChatCreate: {
        click: (e) => {
          e.preventDefault();
          e.stopPropagation();
          const input = this.refs.inputTitle;
          const value = input.value();

          if (!value) {
            input.setError('Нужно ввести имя чата');
            return;
          }

          console.log({ title: value });
          api
            .createChat({ title: value })
            .then(async () => {
              this.updateList();
              this.refs.modal.close();
            })
            .catch((error) => {
              console.error(error);
              input.setError(error.message);
            });
        },
      },
    });

    this.updateList();
    // window.updateChatList = this.updateList.bind(this);
  }

  public updateList(data?: IChat.GETChatUsersRequest) {
    api
      .getChats(data)
      .then((data) => {
        this.setProps({
          chats: data.map((chat) => ({
            ...chat,
            events: {
              click: () => {
                window.onChangeChat({
                  chatConfig: chat,
                  isChatOpen: true,
                  updateChatList: this.updateList,
                });
              },
            },
          })),
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  protected render(): string {
    return `
      <div>
        <div class="m-2">
          {{{ Button
              name="new_chat"
              label="Новый чат"
              type="button"
              className="button-primary"
              events=onModalOpen
          }}}
        </div>

        <div class="m-2">
          <input ref="search" name="search" class="search" type="search" placeholder="Поиск..." />
        </div>

        {{#Modal ref="modal" }}
          <div class="modal">
            <div class="modal__header">
              <h3 class="mb-2">Создать чат</h3>
            </div>
            <div class="modal__body">
              {{# Form className="profile__list" }}
                {{{ Input
                    ref="inputTitle"
                    label="Название чата"
                    name="new_chat_title"
                    type="text"
                }}}
                {{{ Button
                    label="Создать"
                    name="create_chat"
                    className="button-primary"
                    events=onChatCreate
                }}}
              {{/Form}}
            </div>
          </div>
        {{/Modal}}

        <ul>
          {{#each chats}}
            {{{ ChatListItem
              ref=this.userId
              id=this.id
              avatar=this.avatar
              title=this.title 
              last_message=this.last_message
              unread_count=this.unread_count
              events=this.events
            }}}
          {{/each}}
        </ul>
      </div>
    `;
  }
}
