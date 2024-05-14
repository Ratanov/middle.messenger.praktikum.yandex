import Block from '../../core/Block';

interface IProfileRowProps {}

export default class ProfileRow extends Block<object> {
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
            defaultValue=defaultValue 
            readonly=readonly 
          }}}
        </div>
      </div>
    `;
  }
}
