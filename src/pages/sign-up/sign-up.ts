import Block from '../../core/Block';
import { IUser, TEvents } from '../../core/types/api';
import { Form, Input } from '../../components';
import { validations } from '../../core/utilities';
import Router from '../../core/router/Router';
import { api } from '../../core/api';
import { routes } from '../../core/app/withRoutes';

interface ISignUpPageProps {
  events?: Partial<TEvents>;
  onEmail?: Partial<TEvents>;
  onLogin?: Partial<TEvents>;
  onFirstName?: Partial<TEvents>;
  onSecondName?: Partial<TEvents>;
  onPhone?: Partial<TEvents>;
  onPassword?: Partial<TEvents>;
  onPasswordRepeat?: Partial<TEvents>;
  onSignIn?: Partial<TEvents>;
}

type Ref = {
  form: Form;
  email: Input;
  login: Input;
  first_name: Input;
  second_name: Input;
  phone: Input;
  password: Input;
  password_repeat: Input;
};

export class SignUp extends Block<ISignUpPageProps, Ref> {
  constructor() {
    super({
      onEmail: {
        focusout: () => {
          this.validationField('email', 'validationEmail');
        },
      },
      onLogin: {
        focusout: () => {
          this.validationField('login', 'validationLogin');
        },
      },
      onFirstName: {
        focusout: () => {
          this.validationField('first_name', 'validationName');
        },
      },
      onSecondName: {
        focusout: () => {
          this.validationField('second_name', 'validationName');
        },
      },
      onPhone: {
        focusout: () => {
          this.validationField('phone', 'validationPhone');
        },
      },
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
      onSignIn: {
        click: () => Router.go(routes.login.route),
      },
    });
  }

  protected validationAll() {
    return (
      this.validationField('email', 'validationEmail') &&
      this.validationField('login', 'validationLogin') &&
      this.validationField('first_name', 'validationName') &&
      this.validationField('second_name', 'validationName') &&
      this.validationField('phone', 'validationPhone') &&
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
        .signUp(dataRequest as unknown as IUser.SignUpRequest)
        .then(() => {
          Router.go(routes.messenger.route);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.error('validation error');
    }
  }

  protected render(): string {
    return `
      <div class="container">
        {{# Form ref="form" className="form-sign" }}
          {{{ Title text="Регистрация" className="title__h2 text-center" }}}
          <div ref="registerFields">
            {{{ Input
              ref="email"
              label="Почта"
              name="email"
              type="email"
              events=onEmail
            }}}
            {{{ Input 
              ref="login"
              label="Логин"
              name="login"
              type="text"
              events=onLogin
            }}}
            {{{ Input
              ref="first_name"
              label="Имя"
              name="first_name"
              type="text"
              events=onFirstName
            }}}
            {{{ Input
              ref="second_name"
              label="Фамилия"
              name="second_name"
              type="text"
              events=onSecondName
            }}}
            {{{ Input
              ref="phone"
              label="Телефон"
              name="phone"
              type="tel"
              events=onPhone
            }}}
            {{{ Input
              ref="password"
              label="Пароль"
              name="password"
              type="password"
              events=onPassword
            }}}
            {{{ Input
              ref="password_repeat"
              label="Пароль (ещё раз)"
              name="password_repeat"
              type="password"
              events=onPasswordRepeat
            }}}
          </div>
          {{{ Button
            ref="submit"
            name="send"
            type="submit"
            className="button-primary mt-5"
            label="Зарегистрироваться"
          }}}
          {{{ Button
            ref="sign_in"
            name="sign_in" 
            className="button-link" 
            label="Войти" 
            events=onSignIn
          }}}
        {{/Form}}
      </div>
    `;
  }
}
