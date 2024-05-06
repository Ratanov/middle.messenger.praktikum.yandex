import Block from '../../core/Block';

interface IModalProps {}

export default class ModalExample extends Block<IModalProps> {
  constructor(props: IModalProps) {
    super(props);
  }

  protected render(): string {
    return `
     <ul>
        <li><a href="#modal_avatar">Загрузите файл</a></li>
        <li><a href="#modal_avatar_uploaded">Файл загружен</a></li>
        <li><a href="#modal_no_upload">Загрузите файл (нужно выбрать файл)</a></li>
        <li><a href="#modal_upload_error">Ошибка, попробуйте ещё раз</a></li>
        <li><a href="#modal_add_user">Добавить пользователя</a></li>
        <li><a href="#modal_remove_user">Удалить пользователя</a></li>
      </ul>
      <br />
      {{{ Link url="/" text="Назад" }}}

      {{{ Modal id="modal_avatar" title="Загрузите файл" button="Поменять" upload=true }}}
      {{{ Modal id="modal_avatar_uploaded" title="Файл загружен" button="Поменять" img=true }}}
      {{{ Modal id="modal_no_upload" title="Загрузите файл" button="Поменять" img=true bottom="Нужно выбрать файл" bottomClassName="font-11 text-center danger mt-2" }}}
      {{{ Modal id="modal_upload_error" title="Ошибка, попробуйте ещё раз" button="Поменять" upload=true titleClassName="danger" }}}
      {{{ Modal id="modal_add_user" title="Добавить пользователя" button="Добавить" }}}
      {{{ Modal id="modal_remove_user" title="Удалить пользователя" button="Удалить" }}}
    `
  }
}
