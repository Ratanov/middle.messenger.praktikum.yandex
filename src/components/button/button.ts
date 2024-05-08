import Block from '../../core/Block';

interface IButtonProps {
  name?: string;
  type?: 'primary' | 'link' | 'icon';
  className?: string;
  label?: string;
  events?: {
    click: (event: Event) => void;
  };
  onClick?: (event: Event) => void;
}

export default class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super(props);
  }

  protected init(): void {
    this.props.events = {
      click: this.props.onClick,
    };
  }

  protected render(): string {
    const { name, type, className, label } = this.props;
    return `
      <button 
        ref="button"
        type="button"
        name="${name || ''}"
        class="${className ? `button button__${type} ${className}` : `button button__${type}`}"
      >
        ${label || ''} 
      </button>
  `;
  }
}
