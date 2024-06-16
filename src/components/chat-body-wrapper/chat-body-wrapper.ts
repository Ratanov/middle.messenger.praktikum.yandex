import Block from '../../core/Block';

interface IChatWrapperProps {}

export default class ChatWrapper extends Block<IChatWrapperProps> {
  constructor(props: IChatWrapperProps) {
    super(props);
  }

  protected render(): string {
    return '<div class="chat__body px-5"></div>';
  }
}
