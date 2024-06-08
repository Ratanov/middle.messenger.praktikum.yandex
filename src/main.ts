
import { initialRoutes, routes } from './core/app/withRoutes';
import { api } from './core/api';
import Router from './core/router/Router';
import WebSocketTransport from './core/webSocket';
import { IChatProps } from './components/chat/chat';
import { initialComponents } from './core/app/initialComponents';


declare global {
  interface Window {
    updateChatList: () => void;
    onChangeChat: (data: IChatProps) => void;
    messages?: any[];
    WebSocketTransport: WebSocketTransport;
  }
}

initialComponents();

initialRoutes();

document.addEventListener('DOMContentLoaded', async () => {
  window.WebSocketTransport = WebSocketTransport.getInstance();

  try {
    await api.userInfo();
  } catch (error) {
    Router.go(routes.login.route);
    return;
  }

  if (window.location.pathname === routes.login.route || window.location.pathname === routes.signUp.route) {
    Router.go(routes.messenger.route);
  }
});
