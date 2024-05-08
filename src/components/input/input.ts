import Block from '../../core/Block';
import { TEvents } from '../../core/types';

interface IInputProps {
  name?: string;
  type?: string;
  className?: string;
  label?: string;
  readonly?: boolean;
  events?: Partial<TEvents>;
  error?: string;
  defaultValue?: string;
}

type Ref = {
  input: HTMLInputElement;
  error: HTMLDivElement;
};

export default class Input extends Block<IInputProps, Ref> {
  constructor(props: IInputProps) {
    super(props);

    if (props?.defaultValue) {
      this.refs.input.value = props.defaultValue;
    }
  }

  public value() {
    return this.refs.input.value;
  }

  public reset() {
    this.refs.input.value = '';
  }

  public setError(error: string) {
    this.refs.error.innerText = error;
  }

  protected render(): string {
    const { name, type, className, label, readonly } = this.props;
    return `
      <div class="input w-100">
        <label class="input__container">
          <input
            ref="input"
            name="${name || ''}"
            type="${type || 'text'}"
            class="${className ? `input__element ${className}` : 'input__element'}"
            ${readonly ? 'readonly' : ''}
            placeholder=""
            autocomplete="off"
          />
          ${label ? `<div class="input__label">${label}</div>` : ''}
          <div class="input__error" ref="error"></div>
        </label>
      </div>
    `;
  }
}
