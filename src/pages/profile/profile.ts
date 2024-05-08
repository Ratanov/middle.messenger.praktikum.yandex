import Block from '../../core/Block';
import {
  profileProps,
  profileEditProps,
  profileEditPasswordProps,
} from '../../const';

interface IProfileProps {}

type Ref = {};

export class Profile extends Block<IProfileProps, Ref> {
  constructor(props: IProfileProps) {
    super({
      ...props,
      profileInfo: profileProps,
      profileEdit: profileEditProps,
      profileEditPassword: profileEditPasswordProps,
    });
  }

  protected render(): string {
    return `
      <div class="profile">
        <div class="profile__left">
          {{{ Button name="back_btn" className="button__icon button__back" }}}
        </div>
        <div class="profile__right">
          <a href="#" class="profile__avatar">
            <img src="/assets/svg/profile-no-avatar.svg" alt="no-avatar">
            <span class="profile__avatar--edit">Поменять аватар</span>
          </a>
          {{#> Form className="profile__list" }}
            {{#each profileEdit}}
              {{{ProfileRow 
                key=@index 
                name=this.name 
                type=this.type
                className=this.className
                label=this.label 
                defaultValue=this.defaultValue 
                rowType=this.rowType 
                rowClassName=this.rowClassName
                readonly=this.readonly
              }}}
            {{/each}}
          {{/Form}}
        </div>
      </div>
    `;
  }
}

// {{> Modal id="modal_avatar" title="Загрузите файл" button="Поменять" upload=true}}
