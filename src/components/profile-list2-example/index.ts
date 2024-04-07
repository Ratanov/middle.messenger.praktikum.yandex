import Handlebars from "handlebars";
export { default as ProfileList2 } from "./profile-list2.hbs?raw";

Handlebars.registerHelper("rows2", () => {
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
      label: "Сохранить",
      name: "send",
      type: "button",
      className: "mt-5"
    },
  ];
});
