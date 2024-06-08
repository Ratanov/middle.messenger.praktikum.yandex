import Block from '../../core/Block';
import { TEvents } from '../../core/types';

interface IChatWrapperProps {
  isChatOpen?: boolean;
  events?: Partial<TEvents>;
}

export default class ChatWrapper extends Block<IChatWrapperProps> {
  constructor(props: IChatWrapperProps) {
    super(props);
  }

  protected render(): string {
    const { isChatOpen } = this.props;
    if (!isChatOpen) {
      return '<div class="chat--no-content">Выберите чат чтобы отправить сообщение</div>';
    }

    return `<div class="chat"></div>`;
  }
}
