import Block from '../../core/Block';
import { ChatWrapper, ChatHeader, ChatBody, ChatFooter } from '../index';
import { IChat } from '../../core/types/api';
import { IMessageProps } from '../message/message';

export interface IChatProps {
  chatConfig?: IChat.GETChatsResponse;
  isChatOpen?: boolean;
  messages?: Array<IMessageProps>;
}

type Ref = {
  chatWrapper?: ChatWrapper;
  chatHeader?: ChatHeader;
  chatBody?: ChatBody;
  chatFooter?: ChatFooter;
};

export default class Chat extends Block<IChatProps, Ref> {
  constructor(props: IChatProps) {
    super(props);
  }

  protected render(): string {
    const { isChatOpen } = this.props;
    return `
      {{#ChatWrapper ref="chatWrapper" isChatOpen=isChatOpen}}
        ${
          isChatOpen
            ? `
          {{{ ChatHeader ref="chatHeader" chatConfig=chatConfig }}}

          {{{ ChatBody ref="chatBody" chatConfig=chatConfig messages=messages }}}
        
          {{{ ChatFooter ref="chatFooter" }}}
        `
            : ''
        }
      {{/ChatWrapper}}
    `;
  }
}
