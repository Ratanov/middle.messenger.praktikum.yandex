import Block from '../../core/Block';
import { IUser, TEvents } from '../../core/types/api';
import { Form, Input } from '..';
import { validations } from '../../core/utilities';
import { api } from '../../core/api';
import Router from '../../core/router/Router';
import { routes } from '../../core/app/withRoutes';

interface IProfileEditPasswordProps {
  events?: Partial<TEvents>;
  onOldPassword?: Partial<TEvents>;
  onPassword?: Partial<TEvents>;
  onPasswordRepeat?: Partial<TEvents>;
  onCancel?: Partial<TEvents>;
  submitSideEvent?: () => void;
}

type Ref = {
  form: Form;
  old_password: Input;
  password: Input;
  password_repeat: Input;
};

export default class ProfileEditPassword extends Block<
  IProfileEditPasswordProps,
  Ref
> {
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
      onCancel: {
        click: () => {
          Router.go(routes.profile.route);
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
      const dataRequest: Record<string, string> = {};
      for (const [name, value] of data) {
        if (typeof value === 'string') {
          dataRequest[name] = value;
        }
      }
      api
        .changePassword(dataRequest as unknown as IUser.PasswordRequest)
        .then(() => {
          this.props?.submitSideEvent?.();
        })
        .catch((err) => {
          console.error(err);
        });
      Router.go(routes.profile.route);
    } else {
      console.error('validation error');
    }
  }

  protected render(): string {
    return `
      {{# Form ref="form" className="profile__list" }}
        <div class="profile__row">
          {{{ Input 
            ref="oldPassword"
            label="Старый пароль"
            name="oldPassword"
            type="password"
            events=onOldPassword
          }}}
        </div>

        <div class="profile__row">
          {{{ Input 
            ref="password"
            label="Новый пароль"
            name="newPassword"
            type="password"
            events=onPassword
          }}}
        </div>

        <div class="profile__row">
          {{{ Input 
            ref="password_repeat"
            label="Повторите новый пароль"
            name="newPasswordRepeat"
            type="password"
            events=onPasswordRepeat
          }}}
        </div>

        {{{ Button 
          ref="submit"
          name="send"
          type="submit"
          className="mt-5 button-primary" 
          label="Сохранить" 
        }}}

        <div class="profile__row  profile__row_no_after profile__row_no_hover text-center mt-2">
          {{{ Link label="Отменить" className="danger w-100" name="cancel_btn" events=onCancel }}}
        </div>
      {{/Form}}
    `;
  }
}
