import Block from '../../core/Block';
import { TEvents } from '../../core/types/api';
import { Button } from '../';
import WebSocketTransport from '../../core/api/webSocket';

export interface TChatFooterProps {
  events?: Partial<TEvents>;
}

type Ref = {
  attach?: Button;
  input?: HTMLInputElement;
  send?: Button;
};

export default class ChatFooter extends Block<TChatFooterProps, Ref> {
  constructor(props: TChatFooterProps) {
    super({
      ...props,
      events: {
        submit: (e) => {
          e.preventDefault();
          e.stopPropagation();
          const input = this.refs.input as HTMLInputElement;
          if (input.value.length > 0) {
            WebSocketTransport.sendMessage(input.value);
            input.value = '';
          }
        },
      },
    });
  }

  protected render(): string {
    return `
      <footer class="chat__footer px-5">
        {{{ Button ref="attach" name="attach" className="button__icon button__attach popup-trigger" }}}
        {{{ Popup id="popup_attach" position="top" }}}
        {{# Form className="chat__send" }}
          <input ref="input" class="chat__area w-100 mx-2" placeholder="Сообщение" />
          {{{ Button ref="send" type="submit" name="send" className="button__icon button__send" }}}
        {{/Form}}
      </footer>
    `;
  }
}
