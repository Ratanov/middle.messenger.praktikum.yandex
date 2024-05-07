import Block from '../../core/Block';
import { popupUserProps, popupAttachProps } from '../../const';

interface IPopupProps {}

export default class Popup extends Block<IPopupProps> {
  constructor(props: IPopupProps) {
    super({
      ...props,
      popupUser: popupUserProps,
      popupAttach: popupAttachProps,
    });
  }

  protected render(): string {
    return `
      <div id="{{id}}" class="popup popup--{{position}}">
        {{#ifEqual id "popup_user"}}
          {{#each popupUser}}
            <div class="flex align-center py-1">
              <div class="popup__img">
                <img src="{{img}}" alt="{{text}}" />
              </div>
              {{{ Link label=text className="ml-2" }}}
            </div>
          {{/each}}
        {{/ifEqual}}
    
        {{#ifEqual id "popup_attach"}}
          {{#each popupAttach}}
            <div class="flex align-center py-1">
              <div class="popup__img">
                <img src="{{img}}" alt="{{text}}" />
              </div>
              {{{ Link label=text className="ml-2" }}}
            </div>
          {{/each}}
        {{/ifEqual}}
      </div>
    `;
  }
}
