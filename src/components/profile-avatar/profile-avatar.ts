import Block from '../../core/Block';
import { TEvents } from '../../core/types';
import { api } from '../../core/api';
import { IUser } from '../../core/types';

export interface IProfileImageProps {
  isEdit?: boolean;
  user?: IUser.InfoResponse;
  events?: Partial<TEvents>;
}

type Ref = {
  input?: HTMLInputElement;
};

export default class ProfileAvatar extends Block<IProfileImageProps, Ref> {
  constructor(props: IProfileImageProps) {
    super({
      ...props,
      events: {
        change: () => {
          const input = this.refs?.input;
          if (input?.files?.[0]) {
            const formData = new FormData();
            formData.append('avatar', input.files[0]);
            api
              .changeAvatar(formData)
              .then((data) => {
                this.setProps({
                  user: data,
                });
              })
              .catch((err) => {
                console.error(err);
              });
          }
        },
      },
    });

    api
      .userInfo()
      .then((data) => {
        this.setProps({
          user: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  protected render(): string {
    const { user, isEdit } = this.props;
    return ` 
      <div>
        <div class="profile__avatar ${isEdit === true ? 'profile__avatar--edit': ''}">
          <img src="${user?.avatar ? `
            https://ya-praktikum.tech/api/v2/resources${user?.avatar}` 
            : 'assets/svg/profile-no-avatar.svg'}" alt="${user?.first_name} avatar"
          >
          <form>
            ${isEdit === true ? '<label for="avatar" class="profile__label">Поменять</label>' : ''}
            <input
              ref="input"
              id="avatar" 
              type="file" 
              class="d-none" 
              accept="image/png, image/jpeg"
            />
          </form>
        </div>
        <h1 class="profile__name">
          ${user?.first_name ? `${user?.display_name ?? user?.first_name}` : ''}
        </h1>
      </div>
    `;
  }
}
