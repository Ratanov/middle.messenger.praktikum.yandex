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
          {{{ Input ref=ref name=name type=type label=label value=value profile=true readonly=readonly }}}
        </div>
      {{/ifEqual}}

      {{#ifEqual rowType "link"}}
        <div class="profile__row {{rowClassName}}">
          {{{ Link text=label url="/" className=className name=name }}}
        </div>
      {{/ifEqual}}
        
      {{#ifEqual rowType "button"}}
        {{{ Button type="primary" text=label className=className name="row_btn" }}}
      {{/ifEqual}}
    `;
  }
}
