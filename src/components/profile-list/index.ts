import Handlebars from "handlebars";
import "./profile-list.css";
export { default as ProfileList } from "./profile-list.hbs?raw";

Handlebars.registerHelper("rows", () => {
  return [
    {
      label: "Почта",
      text: "pochta@yandex.ru",
      name: "email",
      type: "row",
    },
    {
      label: "Логин",
      text: "ratanovoleg",
      name: "login",
      type: "row",
    },
    {
      label: "Имя",
      text: "Олег",
      name: "first_name",
      type: "row",
    },
    {
      label: "Фамилия",
      text: "Ратанов",
      name: "second_name",
      type: "row",
    },
    {
      label: "Имя в чате",
      text: "Олег",
      name: "display_name",
      type: "row",
    },
    {
      label: "Телефон",
      text: "+7 960 087 87 08",
      name: "phone",
      type: "row",
    },
    {
      label: "Изменить данные",
      name: "change_data",
      type: "link",
      rowClassName: "mt-5 pt-5",
    },
    {
      label: "Изменить пароль",
      name: "change_password",
      type: "link",
    },
    {
      label: "Выйти",
      name: "exit_btn",
      type: "link",
      className: "danger",
    },
  ];
});
