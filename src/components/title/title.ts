import Block from '../../core/Block';

interface ITitleProps {
  text: string;
  className?: string;
}

export default class Title extends Block<ITitleProps> {
  constructor(props: ITitleProps) {
    super(props);
  }

  protected render(): string {
    const { text, className } = this.props;
    return `<p class="${className ? `title ${className}` : 'title'}">${text}</p>`;
  }
}
