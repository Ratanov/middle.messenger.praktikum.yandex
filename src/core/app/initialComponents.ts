import Handlebars from 'handlebars';
import * as Components from '../../components';
import { registerComponent } from '../../core/registerComponent';

export function initialComponents() {
  // Вспомогательная функцию ifEqual для сравнения по строке
  Handlebars.registerHelper(
    'ifEqual',
    function (
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      this: any,
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      value1: any,
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      value2: any,
      options: Handlebars.HelperOptions,
    ) {
      return value1 === value2 ? options.fn(this) : options.inverse(this);
    },
  );

  registerComponent('Form', Components.Form);
  registerComponent('Title', Components.Title);
  registerComponent('Input', Components.Input);
  registerComponent('Button', Components.Button);
  registerComponent('Link', Components.Link);
  registerComponent('ProfileRow', Components.ProfileRow);
  registerComponent('ProfileEdit', Components.ProfileEdit);
  registerComponent('ProfileEditPassword', Components.ProfileEditPassword);
  registerComponent('ProfileAvatar', Components.ProfileAvatar);
  registerComponent('MessageList', Components.Message);
  registerComponent('Chat', Components.Chat);
  registerComponent('ChatList', Components.ChatList);
  registerComponent('ChatListItem', Components.ChatListItem);
  registerComponent('Popup', Components.Popup);
  registerComponent('Modal', Components.Modal);
}
