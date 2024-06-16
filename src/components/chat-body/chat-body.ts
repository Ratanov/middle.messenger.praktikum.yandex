import Block from '../../core/Block';
import { api } from '../../core/api';
import { IChat, TEvents } from '../../core/types/api';
import WebSocketTransport from '../../core/api/webSocket';
import { InfoResponse } from '../../core/types/api/user';
import { ChatBodyWrapper } from '../';

export interface IChatBodyProps {
  chatConfig?: IChat.GETChatsResponse;
  events?: Partial<TEvents>;
  messages?: Array<IChat.WSMessageExt>;
  userInfo?: InfoResponse;
  chatUsers?: Array<IChat.GetChatUsersResponse>;
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
          const chatUsers = await api.getChatUsers({ id: chatId });
          WebSocketTransport.createConnection(
            userInfo.id,
            chatId,
            data.token,
            (messages) => {
              messages.forEach((message) => {
                const user = chatUsers.find(
                  (user) => user.id === message.user_id,
                );
                if (user) {
                  message.firstName = user.first_name;
                }
              });
              this.setProps({
                messages,
                userInfo: userInfo,
              });
            },
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  private scrollToBottom() {
    for (let i = 1; i <= 10; i++) {
      setTimeout(() => {
        const wrapper = this.refs.chat_body_wrapper.element;
        const wrapperHasChild = wrapper?.hasChildNodes();
        if (wrapperHasChild) {
          wrapper?.scrollTo(0, wrapper.scrollHeight);
          return (i = 10);
        }
      }, i * 10);
    }
  }

  protected render(): string {
    this.scrollToBottom();
    return `
      {{#ChatBodyWrapper ref="chat_body_wrapper"}}
        {{#each messages}}
          {{{ Message
            createdBy=${this.props.userInfo?.id}
            firstName=this.firstName
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
