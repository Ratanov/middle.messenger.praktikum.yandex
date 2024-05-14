import Block from '../../core/Block';
import { TEvents } from '../../core/types';
import { Form, Input } from '../../components';
import { navigate } from '../../core/navigate';
import { validations } from '../../utilities';

interface IProfileEditProps {
  events?: Partial<TEvents>;
  onEmail?: Partial<TEvents>;
  onLogin?: Partial<TEvents>;
  onFirstName?: Partial<TEvents>;
  onSecondName?: Partial<TEvents>;
  onDisplayName?: Partial<TEvents>;
  onPhone?: Partial<TEvents>;
}

type Ref = {
  form: Form;
  email: Input;
  login: Input;
  first_name: Input;
  second_name: Input;
  display_name: Input;
  phone: Input;
};

export default class ProfileEdit extends Block<IProfileEditProps, Ref> {
  constructor() {
    super({
      onEmail: {
        blur: () => {
          this.validationField('email', 'validationEmail');
        },
      },
      onLogin: {
        blur: () => {
          this.validationField('login', 'validationLogin');
        },
      },
      onFirstName: {
        blur: () => {
          this.validationField('first_name', 'validationName');
        },
      },
      onSecondName: {
        blur: () => {
          this.validationField('second_name', 'validationName');
        },
      },
      onDisplayName: {
        blur: () => {
          this.validationField('display_name', 'validationName');
        },
      },
      onPhone: {
        blur: () => {
          this.validationField('phone', 'validationPhone');
        },
      },
      events: {
        submit: (e) => this.handleSubmit(e),
      },
    });
  }

  protected validationAll() {
    return (
      this.validationField('email', 'validationEmail') &&
      this.validationField('login', 'validationLogin') &&
      this.validationField('first_name', 'validationName') &&
      this.validationField('second_name', 'validationName') &&
      this.validationField('display_name', 'validationName') &&
      this.validationField('phone', 'validationPhone')
    );
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
      {{# Form ref="form" }}
        <div class="profile__row">
          {{{ Input 
            ref="email"
            label="Почта"
            name="email"
            type="email"
            events=onEmail
            defaultValue="pochta@yandex.ru"
          }}}
        </div>

        <div class="profile__row">
          {{{ Input 
            ref="login"
            label="Логин"
            name="login"
            type="text"
            events=onLogin
            defaultValue="ratanovoleg"
          }}}
        </div>

        <div class="profile__row">
          {{{ Input 
            ref="first_name"
            label="Имя"
            name="first_name"
            type="text"
            events=onFirstName
            defaultValue="Олег"
          }}}
        </div>

        <div class="profile__row">
          {{{ Input 
            ref="second_name"
            label="Фамилия"
            name="second_name"
            type="text"
            events=onSecondName
            defaultValue="Ратанов"
          }}}
        </div>

        <div class="profile__row">
          {{{ Input 
            ref="display_name"
            label="Имя в чате"
            name="display_name"
            type="text"
            events=onDisplayName
            defaultValue="Олег"
          }}}
        </div>

        <div class="profile__row">
          {{{ Input 
            ref="phone"
            label="Телефон"
            name="phone"
            type="tel"
            events=onPhone
            defaultValue="89600878708"
          }}}
        </div>

        {{{ Button 
          ref="submit"
          name="send"
          type="submit"
          className="mt-5 button-primary" 
          label="Сохранить" 
        }}}
      {{/Form}}
    `;
  }
}
