import Block from '../../core/Block';
import { IUser, TEvents } from '../../core/types/api';
import { Form, Input } from '../../components';
import { validations } from '../../core/utilities';
import { api } from '../../core/api';
import Router from '../../core/router/Router';
import { routes } from '../../core/app/withRoutes';

export interface IProfileEditProps {
  events?: Partial<TEvents>;
  onEmail?: Partial<TEvents>;
  onLogin?: Partial<TEvents>;
  onFirstName?: Partial<TEvents>;
  onSecondName?: Partial<TEvents>;
  onDisplayName?: Partial<TEvents>;
  onPhone?: Partial<TEvents>;
  onCancel?: Partial<TEvents>;
  sideEvent?: () => void;
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
  constructor(props: IProfileEditProps) {
    super({
      ...props,
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
      onDisplayName: {
        focusout: () => {
          this.validationField('display_name', 'validationName');
        },
      },
      onPhone: {
        focusout: () => {
          this.validationField('phone', 'validationPhone');
        },
      },
      onCancel: {
        click: () => {
          Router.go(routes.profile.route);
        },
      },
      events: {
        submit: (e) => this.handleSubmit(e),
      },
    });

    api
      .userInfo()
      .then((data) => {
        this.refs.email.setProps({ value: data.email });
        this.refs.login.setProps({ value: data.login });
        this.refs.first_name.setProps({ value: data.first_name });
        this.refs.second_name.setProps({ value: data.second_name });
        this.refs.display_name.setProps({ value: data.display_name });
        this.refs.phone.setProps({ value: data.phone });
      })
      .catch((error) => {
        console.error(error);
        Router.go(routes.login.route);
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
      const dataRequest: Record<string, string> = {};
      for (const [name, value] of data) {
        if (typeof value === 'string') {
          dataRequest[name] = value;
        }
      }
      api
        .changeInfo(dataRequest as unknown as IUser.InfoResponse)
        .then(() => {
          this.props?.sideEvent?.();
        })
        .catch((err) => {
          console.error(err);
        });
      Router.go(routes.profile.route);
    } else {
      console.error('validation error');
    }
  }

  protected render(): string {
    return `
      {{# Form ref="form" className="profile__list" events=formEvents }}
        <div class="profile__row">
          {{{ Input 
            ref="email"
            label="Почта"
            name="email"
            type="email"
            events=onEmail
          }}}
        </div>

        <div class="profile__row">
          {{{ Input 
            ref="login"
            label="Логин"
            name="login"
            type="text"
            events=onLogin
          }}}
        </div>

        <div class="profile__row">
          {{{ Input 
            ref="first_name"
            label="Имя"
            name="first_name"
            type="text"
            events=onFirstName
          }}}
        </div>

        <div class="profile__row">
          {{{ Input 
            ref="second_name"
            label="Фамилия"
            name="second_name"
            type="text"
            events=onSecondName
          }}}
        </div>

        <div class="profile__row">
          {{{ Input 
            ref="display_name"
            label="Имя в чате"
            name="display_name"
            type="text"
            events=onDisplayName
          }}}
        </div>

        <div class="profile__row">
          {{{ Input 
            ref="phone"
            label="Телефон"
            name="phone"
            type="tel"
            events=onPhone
          }}}
        </div>

        {{{ Button 
          ref="submit"
          name="send"
          type="submit"
          className="mt-5 button-primary" 
          label="Сохранить" 
        }}}

        <div class="profile__row profile__row--no-after profile__row--no-hover text-center mt-2">
          {{{ Link label="Отменить" className="danger w-100" name="cancel_btn" events=onCancel }}}
        </div>
      {{/Form}}
    `;
  }
}
