export type TEvents = {
  [eventName in keyof HTMLElementEventMap]: EventListener;
};

export type TEventListener<E extends keyof HTMLElementTagNameMap> =
  HTMLElementTagNameMap[E]['addEventListener'];
