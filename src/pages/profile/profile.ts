import Block from '../../core/Block';
import { TEvents } from '../../core/types';
import { constants } from '../../core/utilities';
import { navigate } from '../../core/navigate';

interface IProfileProps {
  onBack?: Partial<TEvents>;
  onChangeData?: Partial<TEvents>;
  onChangePassword?: Partial<TEvents>;
  onExit?: Partial<TEvents>;
  content?: 'profile' | 'profileEdit' | 'profileEditPassword';
  profileInfo?: {};
}

type Ref = {};

export class Profile extends Block<IProfileProps, Ref> {
  constructor() {
    super({
      content: 'profile',
      profileInfo: constants.profileInfoProps,
      onBack: {
        click: () => {
          navigate('app');
        },
      },
      onChangeData: {
        click: () => {
          this.setProps({
            content: 'profileEdit',
          });
        },
      },
      onChangePassword: {
        click: () => {
          this.setProps({
            content: 'profileEditPassword',
          });
        },
      },
      onExit: {
        click: () => {
          navigate('sign-in');
        },
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
          <a href="#modal_avatar" class="profile__avatar">
            <img src="/assets/svg/profile-no-avatar.svg" alt="no-avatar">
            <span class="profile__avatar--edit">Поменять аватар</span>
          </a>
          {{{ Modal id="modal_avatar" title="Загрузите файл" button="Поменять" upload=true }}}

            ${ content === 'profile' ? `
              {{# Form className="profile__list" }}
                {{#each profileInfo }}
                  {{{ProfileRow 
                    name=this.name 
                    type=this.type
                    label=this.label 
                    defaultValue=this.defaultValue 
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
