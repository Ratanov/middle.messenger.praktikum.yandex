import Block from '../../core/Block';
import { TEvents } from '../../core/types';
import { Form, Input } from '../../components';
import { navigate } from '../../core/navigate';

interface ISignUpPageProps {
  events?: Partial<TEvents>;
  onSubmit?: Partial<TEvents>;
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
    super();
  }

  public handlerSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const data = this.refs.form.getFormData();
    for (const [name, value] of data) {
      console.log(name, ':', value);
    }
  }

  protected render(): string {
    return `
      <div class="container">
        {{# Form ref="form" className="form-sign" }}
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
          {{{ Button name="send" type="submit" className="button-primary mt-5" label="Зарегистрироваться" }}}
          {{{ Button name="sign_in" className="button-link" label="Войти" }}}
        {{/Form}}
      </div>
    `;
  }
}
