import Handlebars from "handlebars";
import './message-header.css';
export { default as MessageHeader } from './message-header.hbs?raw';

Handlebars.registerHelper("popup-user", () => {
    return [
        {
            img: "/assets/svg/plus.svg",
            url: "#modal_add_user",
            text: "Добавить пользователя",
        },
        {
            img: "/assets/svg/cross.svg",
            url: "#modal_remove_user",
            text: "Удалить пользователя",
        }
    ]
});
