import Block from '../../core/Block';

interface IFormProps {
  className?: string;
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
    const { className } = this.props;
    return `<form class="${className ? `form ${className}` : 'form'}" ref="form"></form>`;
  }
}
