import { expect } from 'chai';
import sinon from 'sinon';
import Route from './Route';
import Block from '../Block';

const PAGES = {
  login: '/',
  'sign-up': '/sign-up',
};

describe('Route', () => {
  let route: Route;
  let PageClass: typeof Block<object>;

  beforeEach(() => {
    class Page extends Block<object> {
      constructor(props: object) {
        super({
          ...props,
        });
      }

      protected render(): string {
        return '<div id="testRoute"></div>';
      }
    }

    PageClass = Page;
    route = new Route(PAGES.login, PageClass, { rootQuery: '#app' });
  });

  it('The component is removed from the DOM when the route is changed (Компонент удаляется из DOM при смене маршрута)', () => {
    route.navigate(PAGES['sign-up']);
    route.leave();
    const app = document.querySelector('#app');
    const myComponent = app?.querySelector('#testRoute');
    expect(myComponent).to.be.null;
  });

  it('The route component is rendered (Компонент отрисовывается по маршруту)', () => {
    const renderSpy = sinon.spy(route, 'render');
    route.render();
    expect(renderSpy.calledOnce).to.be.true;
  });

  it('Match the route to the transmitted route (Маршрут соответствует переданному пути)', () => {
    expect(route.match(PAGES.login)).to.be.true;
  });
});
