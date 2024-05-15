import Block from '../../core/Block';
import { TEvents } from '../../core/types';
import { Form, Input, Button } from '../../components';
import { navigate } from '../../core/navigate';
import { validations } from '../../core/utilities';

interface ISignInPageProps {
  events?: Partial<TEvents>;
  onLogin?: Partial<TEvents>;
  onSubmit?: Partial<TEvents>;
  onNoAccount?: Partial<TEvents>;
}

type Ref = {
  form: Form;
  login: Input;
  password: Input;
  submit: Button;
  no_account: Button;
};

export class SignIn extends Block<ISignInPageProps, Ref> {
  constructor() {
    super({
      onLogin: {
        focusout: () => {
          this.validationField('login', 'validationLogin');
        },
      },
      events: {
        submit: (e) => this.handleSubmit(e),
      },
      onNoAccount: {
        click: () => navigate('sign-up'),
      }
    });
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
    const validationResult = this.validationField('login', 'validationLogin');
    if (validationResult) {
      const data = this.refs.form.getFormData();
      for (const [name, value] of data) {
        console.log(name, ':', value);
      }
      navigate('app');
    } else {
      console.error('validation error');
    }
  }

  protected render(): string {
    return `
      <div class="container">
        {{# Form ref="form" className="form-sign" }}
          <div>
            {{{ Title text="Вход" className="title__h2 text-center" }}}
            {{{ Input ref="login" label="Логин" name="login" type="text" events=onLogin }}}
            {{{ Input ref="password" label="Пароль" name="password" type="password" }}}
          </div>
          <div>
            {{{ Button
              ref="submit"
              type="submit"
              name="send"
              className="button-primary mt-5"
              label="Авторизоваться"
            }}}
            {{{ Button
              ref="no_account"
              name="no_account"
              className="button-link"
              label="Нет аккаунта?"
              events=onNoAccount
            }}}
          </div>
        {{/Form}}
      </div>
    `;
  }
}
