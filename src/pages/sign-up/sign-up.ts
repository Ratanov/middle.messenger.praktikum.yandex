import Block from '../../core/Block';
import { Input } from '../../components';
// import { navigate } from '../../core/navigate';
// import * as validators from '../../utils/validator';

type Ref = {
  email: Input;
  login: Input;
  first_name: Input;
  second_name: Input;
  phone: Input;
  password: Input;
  password_repeat: Input;
};

interface ISignUpPageProps {};

export class SignUp extends Block<ISignUpPageProps, Ref> {
  constructor() {
    super(props);
  }

  protected render(): string {
    return `
        <div class="container">
          {{#> Form className="form-sign" }}
            {{{ Title text="Регистрация" className="title__h2 text-center" }}}
            <div>
              {{{ Input label="Почта" name="email" default=true }}}
              {{{ Input label="Логин" name="login" default=true }}}
              {{{ Input label="Имя" name="first_name" default=true }}}
              {{{ Input label="Фамилия" name="second_name" default=true }}}
              {{{ Input label="Телефон" name="phone" default=true }}}
              {{{ Input label="Пароль" name="password" type="password" default=true }}}
              {{{ Input label="Пароль (ещё раз)" name="password_repeat" type="password" default=true }}}
            </div>
            {{{ Button text="Зарегестрироваться" type="primary" className="mt-5" name="send" }}}
            {{{ Button text="Войти" type="link" name="sign_in" }}}
          {{/Form}}
        </div>
    `;
  }
}
