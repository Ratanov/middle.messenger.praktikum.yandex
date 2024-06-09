import Block from '../../core/Block';
import { TEvents } from '../../core/types/api';

interface ILinkProps {
  name?: string;
  url?: string;
  label?: string;
  className?: string;
  img?: string;
  events?: Partial<TEvents>;
}

type Ref = {
  link: HTMLElement;
};

export default class Link extends Block<ILinkProps, Ref> {
  constructor(props: ILinkProps) {
    super(props);
  }

  protected render(): string {
    const { name, url, label, className, img } = this.props;
    return `
      <a
        ref="link"
        ${name ? `name="${name}"` : ''}
        href="${url || '#'}"
        class="${className ? `link ${className}` : 'link'}"
        ${label ? `title="${label}"` : ''}
      >
        ${img ? `<img src="${img}" alt="${label}" />` : ''}
        ${label}
      </a>
    `;
  }
}
