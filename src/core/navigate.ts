import * as Pages from '../pages';

const pages = {
  'start-page': Pages.StartPage,
  'sign-in': Pages.SignIn,
  'sign-up': Pages.SignUp,
  404: Pages.Page404,
  500: Pages.Page500,
  profile: Pages.Profile,
  app: Pages.App,
  'modal-example': Pages.ModalExample
};

export function navigate(page: string) {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = '';
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const Component = pages[page];
  const component = new Component();
  app?.append(component.getContent()!);
}
