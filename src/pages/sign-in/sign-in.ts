import Block from '../../core/Block';
import { TEvents } from '../../core/types';
import { Form, Input, Button } from '../../components';
import { navigate } from '../../core/navigate';

interface ISignInPageProps {
  events?: Partial<TEvents>;
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
      events: {
        submit: (e) => this.handleSubmit(e),
      },
      onNoAccount: {
        click: () => navigate('sign-up'),
      }
    });
  }

  public handleSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const data = this.refs.form.getFormData();
    for (const [name, value] of data) {
      console.log(name, ':', value);
    }
    // navigate('app');
  }

  protected render(): string {
    return `
      <div class="container">
        {{# Form ref="form" className="form-sign" }}
          <div>
            {{{ Title text="Вход" className="title__h2 text-center"}}}
            {{{ Input ref="login" label="Логин" name="login" type="text" }}}
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
