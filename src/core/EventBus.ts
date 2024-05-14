// eslint-disable-next-line
export type Listener<T extends unknown[] = any[]> = (...args: T) => void;

/**
 * Класс для работы с событиями и обработчиками событий.
 * @template E - тип события.
 * @template M - тип для хранения аргументов события.
 */
export default class EventBus<
  E extends string = string,
  // eslint-disable-next-line
  M extends { [K in E]: unknown[] } = Record<E, any[]>,
> {
  private listeners: { [key in E]?: Listener<M[E]>[] } = {};

  /**
   * Обработка события, добавляя `callback` слушателя в массив слушателей события.
   *
   * @param {E} eventName - имя события
   * @param {Listener<M[E]>} listenerCallback - `callback` функция для добавления в качестве слушателя.
   * @return {void}
   */
  on(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  /**
   * Отключение обработчика события.
   *
   * @param {E} eventName - имя события для отключить
   * @param {Listener<M[E]>} listenerCallback - `callback` функция, для удаления из обработчика события.
   * @return {void}
   */
  off(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      (listener) => listener !== callback,
    );
  }

  /**
   * Отправка события с нужными аргументами всем зарегистрированным слушателям.
   * Вызов каждого слушателя с переданными аргументами.
   *
   * @param {E} event - событие для отправки.
   * @param {M[E]} args - аргументы для события.
   */
  emit(event: E, ...args: M[E]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event]!.forEach((listener) => listener(...args));
  }
}
