import Block from '../../core/Block';
import { navigate } from '../../core/navigate';

export class StartPage extends Block<object> {
  constructor() {
    super({
      onSignIn: () => {
        navigate('sign-in');
      },
      onSignUp: () => {
        navigate('sign-up');
      },
      on404: () => {
        navigate('404');
      },
      on500: () => {
        navigate('500');
      },
      onApp: () => {
        navigate('app');
      },
      onProfile: () => {
        navigate('profile');
      },
    });
  }

  protected render(): string {
    return `
        <nav>
            <li><a href="#" page="sign-in">Sign In</a></li>
            <li><a href="#" page="sign-up">Sign Up</a></li>
            <li><a href="#" page="404">404</a></li>
            <li><a href="#" page="500">500</a></li>
            <li><a href="#" page="app" >App</a></li>
            <li><a href="#" page="profile">Profile</a></li>
        </nav>
    `;
  }
}
