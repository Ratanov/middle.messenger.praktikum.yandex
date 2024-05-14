import Block from '../../core/Block';

interface ILinkProps {
  name?: string;
  url?: string;
  label?: string;
  className?: string;
}

type Ref = {
  link: HTMLElement;
};

export default class Link extends Block<ILinkProps, Ref> {
  constructor(props: ILinkProps) {
    super(props);
  }

  protected render(): string {
    const { name, url, label, className } = this.props;
    return `
      <a
        ref="link"
        ${name ? `name="${name}"` : ''}
        href="${url || '#'}"
        class="${className ? `link ${className}` : 'link'}"
        ${label ? `title="${label}"` : ''}
      >
        ${label}
      </a>
    `;
  }
}
