import Block from '../../core/Block';
import { IChat } from '../../core/types/api';

export interface IChatProps {
  chatConfig?: IChat.GETChatsResponse;
  isChatOpen?: boolean;
  messages?: Array<IChat.WSMessageExt>;
  updateChatList?: () => void;
}

export default class Chat extends Block<IChatProps> {
  constructor(props: IChatProps) {
    super(props);
  }

  protected render(): string {
    const { isChatOpen } = this.props;
    return `
      {{#ChatWrapper isChatOpen=isChatOpen}}
        ${
          isChatOpen
            ? `
          {{{ ChatHeader chatConfig=chatConfig }}}
          {{{ ChatBody chatConfig=chatConfig messages=messages }}}
          {{{ ChatFooter }}}
        `
            : ''
        }
      {{/ChatWrapper}}
    `;
  }
}
