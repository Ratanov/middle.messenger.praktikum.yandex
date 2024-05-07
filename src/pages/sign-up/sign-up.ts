import Block from '../../core/Block';
import { Input } from '../../components';

interface ISignUpPageProps {}

type Ref = {
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
    super();
  }

  protected render(): string {
    return `
      <div class="container">
        {{#> Form className="form-sign" }}
          {{{ Title text="Регистрация" className="title__h2 text-center" }}}
          <div>
            {{{ Input label="Почта" name="email" }}}
            {{{ Input label="Логин" name="login" }}}
            {{{ Input label="Имя" name="first_name" }}}
            {{{ Input label="Фамилия" name="second_name" }}}
            {{{ Input label="Телефон" name="phone" }}}
            {{{ Input label="Пароль" name="password" type="password" }}}
            {{{ Input label="Пароль (ещё раз)" name="password_repeat" type="password" }}}
          </div>
          {{{ Button text="Зарегистрироваться" type="primary" className="mt-5" name="send" }}}
          {{{ Button text="Войти" type="link" name="sign_in" }}}
        {{/Form}}
      </div>
    `;
  }
}
