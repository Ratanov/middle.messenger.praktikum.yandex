import { IChat } from '../types/api';

export default class WebSocketTransport {
  private static instance: WebSocketTransport;
  private static ws: WebSocket;
  private static pingIntervalId: number;
  private static url = '';
  private static urlPrefix = 'wss://ya-praktikum.tech/ws/chats/';
  private static callback: (messages: IChat.WSMessageExt[]) => void;

  private constructor() {}

  private static onMessage(event: MessageEvent) {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'pong' || data.type === 'user connected') {
        return;
      }
      const prevMessages = window.messages;
      if (data && Array.isArray(data)) {
        window.messages = [...data.reverse()];
      } else {
        window.messages = prevMessages ? [...prevMessages, data] : [data];
      }
      this.callback(window.messages);
    } catch (error) {
      console.error('Ошибка при парсере JSON:', error);
    }
  }

  private static onOpen() {
    console.log('Соединение установлено');
    this.ws.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      }),
    );
    this.pingIntervalId = setInterval(this.ping.bind(this), 5000);
  }

  private static onClose(event: CloseEvent) {
    if (event.wasClean) {
      console.log('Соединение закрыто');
    } else {
      console.log('Обрыв соединения');
    }
    clearInterval(this.pingIntervalId);
    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  }

  private static onError(event: Event) {
    console.error('Ошибка:', event);
  }

  private static ping() {
    this.ws.send(JSON.stringify({ type: 'ping' }));
  }

  private static resetMessages() {
    window.messages = [];
  }

  private static disconnect() {
    if (!this.ws) {
      return;
    }
    this.resetMessages();
    this.ws.close();

    setTimeout(() => {
      this.ws.removeEventListener('open', this.onOpen);
      this.ws.removeEventListener('message', this.onMessage);
      this.ws.removeEventListener('close', this.onClose);
      this.ws.removeEventListener('error', this.onError);
    }, 500);
  }

  public static createConnection(
    userId: number,
    chatId: number,
    token: string,
    callback: (messages: IChat.WSMessageExt[]) => void,
  ) {
    const prevUrl = this.url;
    this.url = this.urlPrefix + userId + '/' + chatId + '/' + token;
    this.callback = callback;

    if (prevUrl !== this.url && prevUrl !== this.urlPrefix) {
      this.disconnect();
    }

    this.ws = new WebSocket(this.url);

    this.ws.addEventListener('open', this.onOpen.bind(this));
    this.ws.addEventListener('message', this.onMessage.bind(this));
    this.ws.addEventListener('close', this.onClose.bind(this));
    this.ws.addEventListener('error', this.onError.bind(this));
  }

  public static sendMessage(message: string) {
    this.ws.send(
      JSON.stringify({
        content: message,
        type: 'message',
      }),
    );
  }

  public static getInstance(): WebSocketTransport {
    if (!WebSocketTransport.instance) {
      WebSocketTransport.instance = new WebSocketTransport();
    }
    return WebSocketTransport.instance;
  }
}
