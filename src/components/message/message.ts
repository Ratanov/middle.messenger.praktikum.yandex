import Block from '../../core/Block';
import { IChat } from '../../core/types';
import { convertToHHMM } from '../../core/utilities'

export interface IMessageProps extends Partial<IChat.WSMessage> {
  userId?: number;
}

export default class Message extends Block<IMessageProps> {
  constructor(props: IMessageProps) {
    super(props);
  }

  protected render(): string {
    const { time, content, user_id, userId, type, file } = this.props;
    
    return `
      <div class="message ${userId === user_id ? '' : 'message--incoming'} {{className}}">
        ${type === 'image' ? `
          <div class="message__photo">
            <img src="${file}" alt="photo" />
            <span class="message__date">${convertToHHMM(time)}</span>
          </div>` : `
          <div class="message__text">${content}
            <span class="message__date">${convertToHHMM(time)}</span>
          </div>`
        }
      </div>
    `;
  }
}
