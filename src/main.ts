import Handlebars from 'handlebars';
import * as Components from './components';
import { navigate } from './core/navigate';
import { registerComponent } from './core/registerComponent';

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

document.addEventListener('DOMContentLoaded', () => navigate('sign-in'));
registerComponent('Form', Components.Form);
registerComponent('Title', Components.Title);
registerComponent('Input', Components.Input);
registerComponent('Button', Components.Button);
registerComponent('Link', Components.Link);
registerComponent('ProfileRow', Components.ProfileRow);
registerComponent('Message', Components.Message);
registerComponent('Chat', Components.Chat);
registerComponent('Popup', Components.Popup);
registerComponent('Modal', Components.Modal);
