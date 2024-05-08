import Block from '../../core/Block';
import { Input } from '../../components';

interface ISignInPageProps {}

type Ref = {
  login: Input;
  password: Input;
};

export class SignIn extends Block<ISignInPageProps, Ref> {
  constructor() {
    super();
  }

  protected render(): string {
    return `
      <div class="container">
        {{# Form className="form-sign" }}
          <div>
            {{{ Title text="Вход" className="title__h2 text-center"}}}
            {{{ Input ref="login" label="Логин" name="login" type="text" }}}
            {{{ Input ref="password" label="Пароль" name="password" type="password" }}}
          </div>
          <div>
            {{{ Button name="send" className="button-primary mt-5" label="Авторизоваться" }}}
            {{{ Button name="sign_up" className="button-link" label="Нет аккаунта?" }}}
          </div>
        {{/Form}}
      </div>
    `;
  }
}
