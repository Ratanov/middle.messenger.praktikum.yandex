import Block from '../../core/Block';
import { api } from '../../core/api';
import Router from '../../core/router/Router';
import { routes } from '../../core/app/withRoutes';
import { TEvents } from '../../core/types/api';

interface IProfileProps {
  onBack?: Partial<TEvents>;
  onChangeData?: Partial<TEvents>;
  onChangePassword?: Partial<TEvents>;
  onExit?: Partial<TEvents>;
  content?: 'profile' | 'profileEdit' | 'profileEditPassword';
  isEditAvatar?: boolean;
  isProfileNavigate?: boolean;
}

export class Profile extends Block<IProfileProps> {
  constructor() {
    super({
      content: 'profile',
      isEditAvatar: false,
      isProfileNavigate: true,
      onBack: {
        click: () => {
          Router.go(routes.messenger.route);
        },
      },
      onChangeData: {
        click: (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.setProps({
            content: 'profileEdit',
            isEditAvatar: true,
            isProfileNavigate: false,
          });
        },
      },
      onChangePassword: {
        click: (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.setProps({
            content: 'profileEditPassword',
            isEditAvatar: false,
            isProfileNavigate: false,
          });
        },
      },
      onExit: {
        click: () => api.logout().finally(() => Router.go(routes.login.route)),
      },
    });
  }

  protected render(): string {
    const { content, isProfileNavigate } = this.props;
    return `
      <div class="profile">
        <div class="profile__left">
          {{{ Button name="back_btn" className="button__icon button__back" events=onBack }}}
        </div>
        <div class="profile__right">
          {{{ ProfileAvatar isEdit=isEditAvatar }}}

          ${content === 'profile' ? '{{{ ProfileView }}}' : ''}
          ${content === 'profileEdit' ? '{{{ ProfileEdit }}}' : ''}
          ${content === 'profileEditPassword' ? '{{{ ProfileEditPassword }}}' : ''}

          ${
            isProfileNavigate
              ? `
            {{# Form className="profile__list" }}
              <div class="profile__row mt-5">
                {{{ Link label="Изменить данные" name="change_data" events=onChangeData }}}
              </div>
              <div class="profile__row">
                {{{ Link label="Изменить пароль" name="change_password" events=onChangePassword }}}
              </div>
              <div class="profile__row">
                {{{ Link label="Выйти" className="danger" name="exit_btn" events=onExit }}}
              </div>
            {{/Form}}
            `
              : ''
          }
        </div>
      </div>
    `;
  }
}
