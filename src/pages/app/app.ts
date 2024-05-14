import Block from '../../core/Block';
import { TEvents } from '../../core/types';
import { chatListProps, messageListProps } from '../../core/utilities/const';
import { navigate } from '../../core/navigate';

interface IAppProps {
  events?: Partial<TEvents>;
  onProfile?: Partial<TEvents>;
  // eslint-disable-next-line
  chatList: {};
  // eslint-disable-next-line
  messageList: {};
}

// eslint-disable-next-line
type Ref = {};

export class App extends Block<IAppProps, Ref> {
  constructor() {
    super({
      chatList: chatListProps,
      messageList: messageListProps,
      onProfile: {
        click: () => {
          navigate('profile');
        },
      },
    });
  }

  protected render(): string {
    return `
      <div class="app flex">
        <div class="app__left chats">
          {{{ Button name="profile" className="app__button-profile" label="Профиль ˃" events=onProfile }}}
          <div class="mx-2">
            <textarea class="search__area w-100" placeholder="Поиск" rows="1" name="search"></textarea>
          </div>
          <ul>
            {{#each chatList}}
              {{{ Chat 
                title=this.title 
                avatar=this.avatar 
                date=this.date 
                desc=this.desc 
                newMessage=this.newMessage 
                active=this.active 
              }}}
            {{/each}}
          </ul>
        </div>

        <div class="app__border"></div>

        <div class="app__right messages">
          <div class="messages__header mx-5">
            <div class="flex align-center">
              <div class="circle"></div>
                {{{ Title text="Вадим" className="ml-2" }}}
              </div>
            {{{ Button name="popup_user" className="button__icon button__menu popup-trigger" }}}
            {{{ Popup id="popup_user" position="bottom" }}}
          </div>

          <div class="messages__body px-5">
            {{#each messageList}}
              {{{ Message 
                key=@index 
                ref=this.text 
                text=this.text 
                photo=this.photo 
                date=this.date 
                incoming=this.incoming 
              }}}
            {{/each}}
          </div>
          
          <div class="messages__footer mx-5">
            {{{ Button name="attach" className="button__icon button__attach popup-trigger" }}}
            {{{ Popup id="popup_attach" position="top" }}}
            <textarea class="messages__area w-100 mx-2" placeholder="Сообщение" rows="1" name="message" autofocus></textarea>
            {{{ Button name="send" className="button__icon button__send" }}}
          </div>
        </div>

      {{{ Modal id="modal_add_user" title="Добавить пользователя" button="Добавить" }}}
      {{{ Modal id="modal_remove_user" title="Удалить пользователя" button="Удалить" }}}
      </div>
    `;
  }
}
