import Block from '../../core/Block';

interface IMessageProps {}

export default class Message extends Block<IMessageProps> {
  constructor(props: IMessageProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="message {{#if incoming}}message--incoming{{/if}} {{className}}">
        {{#if text}}
          <div class="message__text">{{text}}
            <span class="message__date">{{date}}</span>
          </div>
        {{/if}}
        {{#if photo}}
          <div class="message__photo">
            <img src="{{photo}}" alt="photo" />
            <span class="message__date">{{date}}</span>
          </div>
        {{/if}}
      </div>
    `
  }
}
