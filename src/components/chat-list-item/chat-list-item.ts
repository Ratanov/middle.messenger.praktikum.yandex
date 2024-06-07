import Block from '../../core/Block';

interface IChatListItemProps {}

export default class ChatListItem extends Block<IChatListItemProps> {
  constructor(props: IChatListItemProps) {
    super(props);
  }

  protected render(): string {
    return `
      <a class="chat-list-item {{#if active}}chat-list--active{{/if}}">
        <div class="chat-list-item__avatar">
          <img src="{{avatar}}" alt="{{title}}" />
        </div>
        <div class="chat-list-item__top">
          <div class="flex justify-between">
            <span class="chat-list-item__title">{{title}}</span>
            <span class="chat-list-item__date">{{date}}</span>
          </div>
        </div>
        <div class="chat-list-item__desc">
          <span>{{desc}}</span>
          {{#if newMessage}}
            <span class="chat-list-item__new-message">{{newMessage}}</span>
          {{/if}}
        </div>
      </a>
    `;
  }
}
