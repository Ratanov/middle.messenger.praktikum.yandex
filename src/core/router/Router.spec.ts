import { expect } from 'chai';
import sinon from 'sinon';
import Block from '../Block';
import Route from './Route';
import { Router } from './Router';

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    router = new Router('#app');
  });

  it('Initializing the router (Инициализация роутера)', () => {
    const spyRouter = sinon.spy(router, 'start');
    router.start();
    expect(spyRouter.called).to.be.true;
  });

  it('Adding a route (Добавление маршрута)', () => {
    router.use('/test', Block);
    const route = router.getRoute('/test');
    expect(route).to.be.instanceOf(Route);
  });

  it('Go to router (Перейти по маршруту)', () => {
    const spyRouter = sinon.spy(router, 'go');
    router.go('/new-test');
    expect(spyRouter.calledWithMatch('/new-test')).to.be.true;
  });

  it('Return to previous route (Вернуться на предыдущий маршрут)', () => {
    const spyRouter = sinon.spy(router, 'back');
    router.back();
    expect(spyRouter.calledOnce).to.be.true;
  });
});
