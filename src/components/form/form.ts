import Block from '../../core/Block';
import { TEvents } from '../../core/types';

interface IFormProps {
  ref?: string;
  className?: string;
  events?: Partial<TEvents>;
}

type Ref = {
  form: HTMLFormElement;
};

export default class Form extends Block<IFormProps, Ref> {
  constructor(props: IFormProps) {
    super(props);
  }

  public getFormData() {
    return new FormData(this.refs.form);
  }

  protected render(): string {
    const { ref, className } = this.props;
    return `<form class="${className}" ref="${ref}"></form>`;
  }
}
