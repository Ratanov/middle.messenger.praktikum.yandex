import Block from '../../core/Block';
import { navigate } from '../../core/navigate';

export class StartPage extends Block<object> {
  constructor() {
    super({
      onSighIn: { click: () => navigate('sign-in') },
      onSignUp: { click: () => navigate('sign-up') },
      onApp: { click: () => navigate('app') },
      onProfile: { click: () => navigate('profile') },
      on404: { click: () => navigate('404') },
      on500: { click: () => navigate('500') },
    });
  }

  protected render(): string {
    return `
        <nav>
          <li>{{{ Link label="Авторизации" events=onSighIn }}}</li>
          <li>{{{ Link label="Регистрация" events=onSignUp }}}</li>
          <li>{{{ Link label="Главная" events=onApp }}}</li>
          <li>{{{ Link label="Профиль" events=onProfile }}}</li>
          <li>{{{ Link label="Ошибка 404" events=on404 }}}</li>
          <li>{{{ Link label="Ошибка 500" events=on500 }}}</li>
        </nav>
    `;
  }
}
