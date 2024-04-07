import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

// Вспомогательная функцию ifEqual для сравнения по строке
Handlebars.registerHelper('ifEqual', function(this: any, value1: any, value2: any, options: Handlebars.HelperOptions) {
  return value1 === value2 ? options.fn(this) : options.inverse(this);
});

const pages = {
  'nav': [ Pages.Navigate ],
  'sign-in': [ Pages.SignIn, {test: '123'} ],
  'sign-up': [ Pages.SignUp ],
  '404': [ Pages.Page404 ],
  '500': [ Pages.Page500 ],
  'app': [ Pages.App ],
  'profile': [ Pages.Profile ],
  'profile-edit': [ Pages.ProfileEdit ],
  'profile-edit-pswd': [ Pages.ProfileEditPswd ],
  'modal': [ Pages.Modal ],
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  //@ts-ignore
  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
