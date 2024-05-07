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
        {{#> Form className="form-sign" }}
          <div>
            {{{ Title text="Вход" className="title__h2 text-center"}}}
            {{{ Input ref="login" label="Логин" name="login" type="text" }}}
            {{{ Input ref="password" label="Пароль" name="password" type="password" }}}
          </div>
          <div>
            {{{ Button text="Авторизоваться" type="primary" name="send" className="mt-5" }}}
            {{{ Button text="Нет аккаунта?" type="link" name="sign_up" }}}
          </div>
        {{/Form}}
      </div>
    `;
  }
}
