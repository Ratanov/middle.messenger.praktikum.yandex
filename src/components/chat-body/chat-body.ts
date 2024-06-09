import Block from '../../core/Block';
import { api } from '../../core/api';
import { IChat, TEvents } from '../../core/types/api';
import WebSocketTransport from '../../core/api/webSocket';

export interface IChatBodyProps {
  chatConfig?: IChat.GETChatsResponse;
  events?: Partial<TEvents>;
  messages?: Array<IChat.WSMessage>;
}

export default class ChatBody extends Block<IChatBodyProps> {
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
            (messages) => this.setProps({ messages }),
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  protected render(): string {
    return `
      <div class="chat__body px-5">
        {{#each messages}}
          {{{ Message
            createdBy=${this.props.chatConfig?.created_by}
            user_id=this.user_id
            time=this.time
            type=this.type
            content=this.content
            file=this.file
          }}}
        {{/each}}
      </div>      
    `;
  }
}
