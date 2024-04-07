import Handlebars from "handlebars";
export { default as ProfileList3 } from "./profile-list3.hbs?raw";

Handlebars.registerHelper("rows3", () => {
  return [
    {
      label: "Старый пароль",
      text: "someText",
      type: "row-pswd",
    },
    {
      label: "Новый пароль",
      text: "someTextsomeText",
      type: "row-pswd",
    },
    {
      label: "Повторите новый пароль",
      text: "someTextsomeText",
      type: "row-pswd",
    },
  ];
});
