import Block from '../../core/Block';
import { chatListProps, messageListProps } from '../../const';

interface IAppProps {}

type Ref = {};

export class App extends Block<IAppProps, Ref> {
  constructor(props: IAppProps) {
    super({
      ...props,
      chatList: chatListProps,
      messageList: messageListProps,
    });
  }

  protected render(): string {
    return `
      <div class="app flex">
        <div class="app__left chats">
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
            {{{ Button type="icon" className="button__menu popup-trigger" name="popup_user" }}}
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
            {{{ Button type="icon" className="button__attach popup-trigger" name="attach" }}}
            {{{ Popup id="popup_attach" position="top" }}}
            <textarea class="messages__area w-100 mx-2" placeholder="Сообщение" rows="1" name="message" autofocus></textarea>
            {{{ Button type="icon" className="button__send" name="send" }}}
          </div>
        </div>
      </div>
    `;
  }
}
// {{{ProfileRow 
//     key=@index 
//     ref=this.name
//     name=this.name 
//     type=this.type
//     className=this.className
//     label=this.label 
//     value=this.value 
//     rowType=this.rowType 
//     rowClassName=this.rowClassName
//     readonly=this.readonly
//   }}}



// <div class="app flex">
//     <div class="app__left chats">
//         {{> ChatList}}
//     </div>
//     <div class="app__border"></div>
//     <div class="app__right messages">
//         {{> MessageHeader}}
//         {{> MessageList}}
//         {{> MessageFooter}}
//     </div>
// </div>

// MessageHeader
// {{> Modal id="modal_add_user" title="Добавить пользователя" button="Добавить"}}
// {{> Modal id="modal_remove_user" title="Удалить пользователя" button="Удалить"}}