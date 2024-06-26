import Handlebars from 'handlebars';
import * as Components from '../../components';
import { registerComponent } from '../../core/registerComponent';

export function initialComponents() {
  // Вспомогательная функцию ifEqual для сравнения по строке
  Handlebars.registerHelper(
    'ifEqual',
    function (
      this: unknown,
      value1: unknown,
      value2: unknown,
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
  registerComponent('ProfileView', Components.ProfileView);
  registerComponent('ProfileEdit', Components.ProfileEdit);
  registerComponent('ProfileEditPassword', Components.ProfileEditPassword);
  registerComponent('ProfileAvatar', Components.ProfileAvatar);
  registerComponent('Message', Components.Message);
  registerComponent('Chat', Components.Chat);
  registerComponent('ChatList', Components.ChatList);
  registerComponent('ChatListItem', Components.ChatListItem);
  registerComponent('Popup', Components.Popup);
  registerComponent('Modal', Components.Modal);
  registerComponent('ChatWrapper', Components.ChatWrapper);
  registerComponent('ChatHeader', Components.ChatHeader);
  registerComponent('ChatBodyWrapper', Components.ChatBodyWrapper);
  registerComponent('ChatBody', Components.ChatBody);
  registerComponent('ChatFooter', Components.ChatFooter);
}
