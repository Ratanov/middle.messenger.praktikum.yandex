import Block from '../../core/Block';
import { TEvents } from '../../core/types/api';
import { TValidationResult } from '../../core/types/utilities/validation';
import { validations } from '../../core/utilities';

interface IInputProps {
  name?: string;
  type?: 'text' | 'number' | 'password' | 'email' | 'tel' | 'search';
  className?: string;
  label?: string;
  readonly?: boolean;
  events?: Partial<TEvents>;
  error?: string;
  value?: string;
}

type Ref = {
  input: HTMLInputElement;
  error: HTMLDivElement;
};

export default class Input extends Block<IInputProps, Ref> {
  constructor(props: IInputProps) {
    super(props);
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

  protected validationField(
    field: keyof Ref,
    validation: keyof typeof validations,
  ) {
    const input = this.refs[`${field}`];
    if (input instanceof Input) {
      return this.validation(validations[validation]);
    }
    return false;
  }

  public setError(error: string) {
    this.refs.error.innerText = error;
  }

  public setValue(value: string) {
    this.refs.input.innerText = value;
  }

  protected render(): string {
    const { name, type, className, label, readonly, value } = this.props;
    return `
      <div class="input w-100">
        <label class="input__container">
          <input
            ref="input"
            name="${name || ''}"
            type="${type || 'text'}"
            class="${className ? `input__element ${className} ${readonly ? 'input__element_readonly' : ''}` : `input__element ${readonly ? 'input__element_readonly' : ''}`}"
            ${readonly ? 'readonly' : ''}
            placeholder=""
            ${value ? `value="${value}"` : ''}
            autocomplete="off"
          />
          ${label ? `<div class="input__label">${label}</div>` : ''}
          <span class="input__error" ref="error"></span>
        </label>
      </div>
    `;
  }
}
