import Block from '../../core/Block';

export interface IProfileRowProps {
  name?: string;
  type?: 'text' | 'number' | 'password' | 'email' | 'tel';
  label?: string;
  readonly?: boolean;
  value?: string;
}

export default class ProfileRow extends Block<IProfileRowProps> {
  constructor(props: IProfileRowProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="profile__row">
        <div class="flex justify-between w-100">
          <span class="profile__label w-100">{{label}}</span>
          {{{ Input 
            ref=ref 
            name=name 
            type=type 
            readonly=readonly 
            value=value
          }}}
        </div>
      </div>
    `;
  }
}
