import Block from '../../core/Block';
import { TEvents } from '../../core/types';
import { TValidationResult } from '../../utilities/validationType';

interface IInputProps {
  name?: string;
  type?: 'text' | 'number' | 'password' | 'email' | 'tel';
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

    if (props?.events?.blur) {
      this.refs.input.addEventListener('blur', () => {
        props?.events?.blur?.(new Event('blur'));
      });
    }
  }

  public value() {
    return this.refs.input.value;
  }

  public reset() {
    this.refs.input.value = '';
  }

  public validation(callback: (value: string) => TValidationResult): boolean {
    const value = this.value();
    if (!value) {
      this.setError('');
      return false;
    }
  
    const result = callback(value);
    this.setError(result.result ? '' : result.message);
    return result.result;
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
          />
          ${label ? `<div class="input__label">${label}</div>` : ''}
          <span class="input__error" ref="error"></span>
        </label>
      </div>
    `;
  }
}
