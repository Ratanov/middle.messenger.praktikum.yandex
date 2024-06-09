import { initialRoutes, routes } from './core/app/withRoutes';
import { api } from './core/api';
import Router from './core/router/Router';
import { IChatProps } from './components/chat';
import { initialComponents } from './core/app/initialComponents';
import WebSocketTransport from './core/api/webSocket';
import { IMessageProps } from './components/message/message';
import { IChat } from './core/types/api';

declare global {
  interface Window {
    updateChatList: () => void;
    onChangeChat: (data: IChatProps) => void;
    messages?: Array<IChat.WSMessage> & IMessageProps;
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

  if (
    window.location.pathname === routes.login.route ||
    window.location.pathname === routes.signUp.route
  ) {
    Router.go(routes.messenger.route);
  }
});
