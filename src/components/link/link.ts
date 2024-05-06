import Block from '../../core/Block';

interface ILinkProps {
  name: string;
  url: string;
  className?: string;
  text: string;
  events?: {
    click: (event: Event) => void;
  };
  onClick?: (event: Event) => void;
}

export default class Link extends Block<ILinkProps> {
  constructor(props: ILinkProps) {
    super(props);
  }

  protected init(): void {
    this.props.events = {
      click: this.props.onClick,
    };
  }

  protected render(): string {
    const { name, url, className, text } = this.props;
    return `
      <a
        ${name ? `name="${name}"` : ''}
        href="${url}"
        class="link ${className ? `link ${className}` : 'link'}"
        title="${text}"
      >
        ${text}
      </a>
    `;
  }
}
