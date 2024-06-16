import Block from '../../core/Block';
import { IChat } from '../../core/types/api';
import { convertTime } from '../../core/utilities';

export default class Message extends Block<Partial<IChat.WSMessageExt>> {
  constructor(props: Partial<IChat.WSMessageExt>) {
    super(props);
  }

  protected render(): string {
    const { createdBy, firstName, time, user_id, type, content, file } =
      this.props;
    return `
      <div class="message ${createdBy === user_id ? '' : 'message_incoming'}">
        ${createdBy === user_id ? '' : `<span class="message__name">${firstName}:</span>`}
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
