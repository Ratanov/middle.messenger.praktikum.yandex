import Block from '../../core/Block';
import { api } from '../../core/api';
import { IChat } from '../../core/types';
import WebSocketTransport from '../../core/webSocket';

export interface IChatProps {
  chatConfig?: IChat.GETChatsResponse;
  isChatOpen?: boolean;
  updateChatList?: () => void;
  messages?: Array<IChat.WSMessage>;
}

export default class Chat extends Block<IChatProps> {
  constructor(props: IChatProps) {
    super(props);

    const chatId = props.chatConfig?.id;
    console.log('chatId', chatId);
    if (chatId) {
      api
        .getToken({ chatId: chatId })
        .then(async (data) => {
          const userInfo = await api.userInfo();
          WebSocketTransport.createConnection(
            userInfo.id,
            chatId,
            data.token,
            (messages) => this.setProps({ messages }),
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  protected render(): string {
    const { isChatOpen } = this.props;
    return `
      {{#ChatWrapper ref="chatsWrapper" isChatOpen=isChatOpen}}
        ${
          isChatOpen
            ? `
          {{{ ChatHeader chatConfig=chatConfig }}}

          {{{ ChatBody }}}
        
          <div class="chat__footer px-5">
            {{{ Button name="attach" className="button__icon button__attach popup-trigger" }}}
            {{{ Popup id="popup_attach" position="top" }}}
            <textarea class="chat__area w-100 mx-2" placeholder="Сообщение" rows="1" name="message" autofocus></textarea>
            {{{ Button name="send" className="button__icon button__send" }}}
          </div>
        `
            : ''
        }
      {{/ChatWrapper}}
    `;
  }
}
