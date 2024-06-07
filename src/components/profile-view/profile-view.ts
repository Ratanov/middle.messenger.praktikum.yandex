import Block from '../../core/Block';
import { Form, Input } from '../index';
import { api } from '../../core/api';
import Router from '../../core/router/Router';
import { routes } from '../../core/app/withRoutes';
import { IProfileRowProps } from '../profile-row/profile-row';

export interface IProfileViewProps {
  profileRowItems: IProfileRowProps[];
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

export default class ProfileView extends Block<IProfileViewProps, Ref> {
  constructor(props: IProfileViewProps) {
    super({
      profileRowItems: [],
    });

    api
      .userInfo()
      .then((data) => {
        console.log('data', data)
        this.setProps({
          profileRowItems: [
            { name: 'email', type: 'email', label: 'Почта', readonly: true, value: data.email },
            { name: 'login', type: 'text', label: 'Логин', readonly: true, value: data.login },
            { name: 'first_name', type: 'text', label: 'Имя', readonly: true, value: data.first_name },
            { name: 'second_name', type: 'text', label: 'Фамилия', readonly: true, value: data.second_name },
            { name: 'display_name', type: 'text', label: 'Имя в чате', readonly: true, value: data.display_name },
            { name: 'phone', type: 'tel', label: 'Телефон', readonly: true, value: data.phone },
          ],
        });
      })
      .catch((error) => {
        console.error(error);
        Router.go(routes.login.route);
      });
  }

  protected render(): string {
    return `
      {{# Form className="profile__list" }}
        {{#each profileRowItems }}
          {{{ ProfileRow 
            ref="profile_row"
            name=this.name
            type=this.type
            label=this.label
            readonly=readonly
            value=this.value
          }}}
        {{/each}}
      {{/Form}}
    `
  }
}
