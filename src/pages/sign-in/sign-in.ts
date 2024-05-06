import Block from '../../core/Block';
import { Input } from '../../components';
import { navigate } from '../../core/navigate';
// import * as validators from '../../utils/validator';

type Ref = {
  login: Input;
  password: Input;
};
interface ISignInPageProps {
  validate: { [key: string]: Function };
  onLogin: (event: Event) => void;
  onAuth: (event: Event) => void;
}

export class SignIn extends Block<ISignInPageProps, Ref> {
  constructor() {
    super({
      validate: {
        // login: validators.login,
        // password: validators.password,
      },
      onLogin: (event: Event) => {
        event.preventDefault();
        const login = this.refs.login.value();
        const password = this.refs.password.value();
        // const errorLogin = validators.login(login);
        // const errorPassword = validators.password(password);
        // if (errorLogin || errorPassword) {
        //   return;
        // }

        // console.log({
        //   login,
        //   password,
        // });
        navigate('messages');
      },
      onAuth: (event: Event) => {
        event.preventDefault();
        navigate('signin');
      },
    });
  }

  protected render(): string {
    return `
      <div class="container">
        {{#> Form className="form-sign" }}
          <div>
            {{{ Title text="Вход" className="title__h2 text-center"}}}
            {{{ Input ref="login" label="Логин" name="login" type="text" default=true }}}
            {{{ Input ref="password" label="Пароль" name="password" type="password" default=true }}}
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
