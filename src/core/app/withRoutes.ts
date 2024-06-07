import { SignIn } from '../../pages/sign-in';
import { SignUp } from '../../pages/sign-up';
import { Messenger } from '../../pages/messenger';
import { NotFound } from '../../pages/not-found';
import { ServerError } from '../../pages/server-error';
import { Profile } from '../../pages/profile';
import Router from '../router/Router';

export const routes = {
  login: { content: SignIn, route: '/' },
  signUp: { content: SignUp, route: '/sign-up' },
  messenger: { content: Messenger, route: '/messenger' },
  notFound: { content: NotFound, route: '/not-found' },
  serverError: { content: ServerError, route: '/server-error' },
  profile: { content: Profile, route: '/profile' },
};

export const initialRoutes = () => {
  Object.values(routes).forEach((value) => {
    const { route, content } = value;
    Router.use(route, content);
  });

  Router.start();
};
