import Block from '../../core/Block';
import { TEvents } from '../../core/types';

interface IButtonProps {
  name?: string;
  type?: 'button' | 'submit';
  className?: string;
  label?: string;
  events?: Partial<TEvents>;
}

type Ref = {
  button: HTMLButtonElement;
}

export default class Button extends Block<IButtonProps, Ref> {
  constructor(props: IButtonProps) {
    super(props);
  }

  protected render(): string {
    const { name, type, className, label } = this.props;
    return `
      <button 
        ref="button"
        type="${type || 'button'}"
        name="${name || ''}"
        class="${className ? `button ${className}` : 'button'}"
      >
        ${label || ''} 
      </button>
  `;
  }
}
