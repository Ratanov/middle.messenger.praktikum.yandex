import Handlebars, { HelperOptions } from 'handlebars';
import Block, { RefType } from './Block';

// eslint-disable-next-line
interface BlockConstructable<Props extends object, R extends {}> {
  new (props: Props): Block<Props, R>;
}

export interface IChildren<Props extends object, R extends RefType> {
  component: Block<Props, R>;
  embed: (fragment: DocumentFragment) => void;
}

// eslint-disable-next-line
export function registerComponent<Props extends object, R extends {}>(
  name: string,
  Component: BlockConstructable<Props, R>,
) {
  if (name in Handlebars.helpers) {
    throw new Error(`The ${name} component is already registered!`);
  }

  Handlebars.registerHelper(
    name,
    function (this: unknown, { hash, data, fn }: HelperOptions) {
      const component = new Component(hash);

      const dataAttribute = `data-id="${component.id}"`;

      if ('ref' in hash) {
        (data.root.__refs = data.root.__refs || {})[hash.ref] = component;
      }

      (data.root.__children = data.root.__children || []).push({
        component,
        embed(fragment: DocumentFragment) {
          const stub = fragment.querySelector(`[${dataAttribute}]`);

          if (!stub) {
            return;
          }

          component.getContent()?.append(...Array.from(stub.childNodes));

          stub.replaceWith(component.getContent()!);
        },
      });

      const contents = fn ? fn(this) : '';

      return `<div ${dataAttribute}>${contents}</div>`;
    },
  );
}
