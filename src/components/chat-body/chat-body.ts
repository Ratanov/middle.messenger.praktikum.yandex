import Block from '../../core/Block';
import { api } from '../../core/api';
import { IChat, TEvents } from '../../core/types/api';
import WebSocketTransport from '../../core/api/webSocket';
import { InfoResponse } from '../../core/types/api/user';
import { ChatBodyWrapper } from '../';

export interface IChatBodyProps {
  chatConfig?: IChat.GETChatsResponse;
  events?: Partial<TEvents>;
  messages?: Array<IChat.WSMessage>;
  userInfo: InfoResponse;
}

type Ref = {
  chat_body_wrapper: ChatBodyWrapper;
};

export default class ChatBody extends Block<IChatBodyProps, Ref> {
  constructor(props: IChatBodyProps) {
    super(props);

    const chatId = props.chatConfig?.id;
    if (chatId) {
      api
        .getToken({ chatId: chatId })
        .then(async (data) => {
          const userInfo = await api.userInfo();
          WebSocketTransport.createConnection(
            userInfo.id,
            chatId,
            data.token,
            (messages) =>
              this.setProps({
                messages,
                userInfo: userInfo,
              }),
          );
        })
        .then(() => {
          for (let i = 1; i <= 10; i++) {
            setTimeout(() => {
              const wrapper = this.refs.chat_body_wrapper.element;
              const wrapperHasChild = wrapper?.hasChildNodes();
              if (wrapperHasChild) {
                wrapper?.scrollTo(0, wrapper.scrollHeight);
                return (i = 10);
              }
            }, i * 100);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  protected render(): string {
    return `
      {{#ChatBodyWrapper ref="chat_body_wrapper"}}
        {{#each messages}}
          {{{ Message
            createdBy=${this.props.userInfo?.id}
            user_id=this.user_id
            time=this.time
            type=this.type
            content=this.content
            file=this.file
          }}}
        {{/each}}
      {{/ChatBodyWrapper}}      
    `;
  }
}
