import Block from '../../core/Block';
import { TEvents } from '../../core/types';
import { Form, Input } from '..';
import { navigate } from '../../core/navigate';
import { validations } from '../../core/utilities';

interface IProfileEditPasswordProps {
  events?: Partial<TEvents>;
  onOldPassword?: Partial<TEvents>;
  onPassword?: Partial<TEvents>;
  onPasswordRepeat?: Partial<TEvents>;
}

type Ref = {
  form: Form;
  old_password: Input;
  password: Input;
  password_repeat: Input;
};

export default class ProfileEditPassword extends Block<IProfileEditPasswordProps, Ref> {
  constructor() {
    super({
      onPassword: {
        focusout: () => {
          this.validationField('password', 'validationPassword');
        },
      },
      onPasswordRepeat: {
        focusout: () => {
          this.validationRepeatPassword();
        },
      },
      events: {
        submit: (e) => this.handleSubmit(e),
      },
    });
  }

  protected validationAll() {
    return (
      this.validationField('password', 'validationPassword') &&
      this.validationRepeatPassword()
    );
  }

  protected validationRepeatPassword(): boolean {
    const password = this.refs.password?.value();
    const repeatPassword = this.refs.password_repeat?.value();

    if (!repeatPassword || password === repeatPassword) {
      this.refs.password_repeat?.setError('');
      return true;
    }

    this.refs.password_repeat?.setError('Пароли не совпадают');
    return false;
  }

  protected validationField(
    field: keyof Ref,
    validation: keyof typeof validations,
  ) {
    const input = this.refs[`${field}`];
    if (input instanceof Input) {
      return input.validation(validations[validation]);
    }
    return false;
  }

  public handleSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const validationResult = this.validationAll();
    if (validationResult) {
      const data = this.refs.form.getFormData();
      for (const [name, value] of data) {
        console.log(name, ':', value);
      }
      navigate('profile');
    } else {
      console.error('validation error');
    }
  }

  protected render(): string {
    return `
      {{# Form ref="form" className="profile__list" }}
        <div class="profile__row">
          {{{ Input 
            ref="old_password"
            label="Старый пароль"
            name="old_password"
            type="password"
            events=onOldPassword
            defaultValue="yandex.ru"
          }}}
        </div>

        <div class="profile__row">
          {{{ Input 
            ref="password"
            label="Новый пароль"
            name="password"
            type="password"
            events=onPassword
            defaultValue="ratanovoleg"
          }}}
        </div>

        <div class="profile__row">
          {{{ Input 
            ref="password_repeat"
            label="Повторите новый пароль"
            name="password_repeat"
            type="password"
            events=onPasswordRepeat
            defaultValue="ratanovoleg"
          }}}
        </div>

        {{{ Button 
          ref="submit"
          name="send"
          type="submit"
          className="mt-5 button-primary" 
          label="Сохранить" 
        }}}
      {{/Form}}
    `;
  }
}
