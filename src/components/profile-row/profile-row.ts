import Block from '../../core/Block';

interface IProfileRowProps {}

export default class ProfileRow extends Block<object> {
  constructor(props: IProfileRowProps) {
    super(props);
  }

  protected render(): string {
    return `
      {{#ifEqual rowType "row"}}
        <div class="profile__row {{rowClassName}}">
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
      {{/ifEqual}}

      {{#ifEqual rowType "link"}}
        <div class="profile__row {{rowClassName}}">
          {{{ Link label=label className=className name=name }}}
        </div>
      {{/ifEqual}}
        
      {{#ifEqual rowType "button"}}
        {{{ Button name="row_btn" type="primary" className=className label=label }}}
      {{/ifEqual}}
    `;
  }
}
