import Block from '../../core/Block';
import { IChat, TEvents } from '../../core/types/api';
import { convertTime } from '../../core/utilities';

interface IChatListItemProps extends Partial<IChat.GETChatsResponse> {
  events?: Partial<TEvents>;
}

type Ref = {
  item?: HTMLLIElement;
  avatar?: HTMLImageElement;
  name?: HTMLSpanElement;
  lastMessage?: HTMLSpanElement;
  time?: HTMLSpanElement;
  count?: HTMLSpanElement;
};

export default class ChatListItem extends Block<IChatListItemProps, Ref> {
  constructor(props: IChatListItemProps) {
    super(props);
  }

  protected render(): string {
    const { id, avatar, title, last_message, unread_count } = this.props;
    return `
      <li ref="chat-list-body-item" id=${id} class="chat-list-body-item {{#if active}}chat-list--active{{/if}}">
        <div class="chat-list-body-item__avatar">
          <img ref="avatar" src="${
            avatar
              ? `https://ya-praktikum.tech/api/v2/resources${avatar}`
              : 'assets/img/avatar.jpg'
          }" alt="${title} avatar" />
        </div>
        <div class="chat-list-body-item__top">
          <div class="flex justify-between">
            <span ref="name" class="chat-list-body-item__title">${title}</span>
            ${
              last_message
                ? `<span ref="time" class="chat-list-body-item__date">${convertTime(last_message?.time)}</span>`
                : ''
            }
          </div>
        </div>
        <div class="chat-list-body-item__desc">
          ${
            last_message
              ? `<span ref="lastMessage">${last_message?.content}</span>`
              : ''
          }
          ${
            unread_count
              ? `<span ref="count" class="chat-list-body-item__new-message">${unread_count}</span>`
              : ''
          }
        </div>
      </li>
    `;
  }
}
