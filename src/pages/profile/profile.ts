import Block from '../../core/Block';
import { api } from '../../core/api';
import { routes } from '../../core/app/withRoutes';
import Router from '../../core/router/Router';
import { TEvents } from '../../core/types';
import { constants } from '../../core/utilities';

interface IProfileProps {
  onBack?: Partial<TEvents>;
  onChangeData?: Partial<TEvents>;
  onChangePassword?: Partial<TEvents>;
  onExit?: Partial<TEvents>;
  content?: 'profile' | 'profileEdit' | 'profileEditPassword';
  // eslint-disable-next-line
  profileInfo?: {};
  isEditAvatar?: boolean;
}

// eslint-disable-next-line
type Ref = {
  profile_row?: any;
};

export class Profile extends Block<IProfileProps, Ref> {
  constructor() {
    super({
      content: 'profile',
      profileInfo: constants.profileInfoProps, /* ToDo */
      isEditAvatar: false,
      onBack: {
        click: () => {
          Router.back()
        },
      },
      onChangeData: {
        click: (e) => {
          e.preventDefault()
          this.setProps({
            content: 'profileEdit',
            isEditAvatar: true,
          });
        },
      },
      onChangePassword: {
        click: (e) => {
          e.preventDefault()
          this.setProps({
            content: 'profileEditPassword',
          });
        },
      },
      onExit: {
        click: () => api.logout().finally(() => Router.go(routes.login.route)),
      },
    });

  }

  protected render(): string {
    const { content } = this.props;
    return `
      <div class="profile">
        <div class="profile__left">
          {{{ Button name="back_btn" className="button__icon button__back" events=onBack }}}
        </div>
        <div class="profile__right">
          {{{ ProfileAvatar isEdit=isEditAvatar }}}
            ${ content === 'profile' ? `
              {{# Form className="profile__list" }}
                {{#each profileInfo }}
                  {{{ProfileRow ref="profile_row"
                    name=this.name 
                    type=this.type
                    label=this.label 
                    readonly=this.readonly
                  }}}
                {{/each}}
                <div class="profile__row mt-5 pt-5">
                  {{{ Link label="Изменить данные" name="change_data" events=onChangeData }}}
                </div>
                <div class="profile__row">
                  {{{ Link label="Изменить пароль" name="change_password" events=onChangePassword }}}
                </div>
                <div class="profile__row">
                  {{{ Link label="Выйти" className="danger" name="exit_btn" events=onExit }}}
                </div>
              {{/Form}}
            ` : ''}
            ${ content === 'profileEdit' ? `{{{ ProfileEdit }}}` : '' }
            ${ content === 'profileEditPassword' ? `{{{ ProfileEditPassword }}}` : '' }
        </div>
      </div>
    `;
  }
}
