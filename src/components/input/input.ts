import Block from '../../core/Block';

interface IInputProps {
  ref?: string;
  name: string;
  type: string;
  className?: string;
  label: string;
  value?: string;
  readonly: boolean;
  onBlur?: () => void;
  events?: { blur: (() => void) | undefined };
  error?: string | undefined;
}

export default class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
      },
    });
  }

  protected render(): string {
    const { ref, name, type, className, label, value, readonly } = this.props;
    return `
        <div class="input w-100">
          {{#if default}}
            <label class="input__container mt-5">
              <input
                ref="${ref}"
                name="${name}"
                type="${type || 'text'}"
                class="${className ? `input__element ${className}` : 'input__element'}"
                ${value ? `value="${value}"` : ''}
                ${readonly ? 'readonly' : ''}
                placeholder=""
              />
              <div class="input__label">${label}</div>
            </label>
          {{/if}}
          {{#if profile}}
            <div class="flex justify-between">
              <span class="profile__label">${label}</span>
              <input 
                ref="${ref}"
                name="${name}" 
                type="${type || 'text'}"
                class="${className ? `profile__text ${className}` : 'profile__text'}"
                ${value ? `value="${value}"` : ''}
                ${readonly ? 'readonly' : ''}
              />
            </div>
          {{/if}}
        </div>
    `;
  }
}
