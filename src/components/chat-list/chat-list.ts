import Block from '../../core/Block';
import { chatListProps } from '../../core/utilities/const';

interface IChatListProps {
  chatListItem: {};
}

export default class ChatList extends Block<IChatListProps> {
  constructor() {
    super({
      chatListItem: chatListProps,
    });
  }

  protected render(): string {
    return `
      <ul>
        {{#each chatListItem}}
          {{{ ChatListItem 
            title=this.title 
            avatar=this.avatar 
            date=this.date 
            desc=this.desc 
            newMessage=this.newMessage 
            active=this.active 
          }}}
        {{/each}}
      </ul>
    `;
  }
}
