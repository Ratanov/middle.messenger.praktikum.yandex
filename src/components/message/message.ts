import Block from '../../core/Block';
import { api } from '../../core/api';
import { IChat } from '../../core/types/api';
import { convertTime } from '../../core/utilities';

export interface IMessageProps extends Partial<IChat.WSMessage> {
  createdBy?: number;
  chatId?: any;
}

export default class Message extends Block<IMessageProps> {
  constructor(props: IMessageProps) {
    super(props);
  }

  protected render(): string {
    const { createdBy, time, user_id, type, content, file } = this.props;
    return `
      <div class="message ${createdBy === user_id ? '' : 'message--incoming'}">
        <span>id${user_id}:</span>&nbsp;
        ${
          type === 'image'
            ? `
          <div class="message__photo">
            <img src="${file}" alt="photo" />
            <span class="message__date">${convertTime(time)}</span>
          </div>`
            : `
          <div class="message__text">${content}
            <span class="message__date">${convertTime(time)}</span>
          </div>`
        }
      </div>
    `;
  }
}
