import Block from '../../core/Block';

interface IChatProps {}

export default class Chat extends Block<IChatProps> {
  constructor(props: IChatProps) {
    super(props);
  }

  protected render(): string {
    return `
      <a class="chat {{#if active}}chat--active{{/if}}">
        <div class="chat__avatar">
          <img src="{{avatar}}" alt="{{title}}" />
        </div>
        <div class="chat__top">
          <div class="flex justify-between">
            <span class="chat__title">{{title}}</span>
            <span class="chat__date">{{date}}</span>
          </div>
        </div>
        <div class="chat__desc">
          <span>{{desc}}</span>
          {{#if newMessage}}
            <span class="chat__new-message">{{newMessage}}</span>
          {{/if}}
        </div>
      </a>
    `;
  }
}
