export type TEvents = {
  [eventName in keyof HTMLElementEventMap]: EventListener;
};

export type TEventListener<E extends keyof HTMLElementTagNameMap> =
  HTMLElementTagNameMap[E]['addEventListener'];

export type ApiError = {
  reason: string;
};

export * as IChat from './chat';
export * as IUser from './user';
