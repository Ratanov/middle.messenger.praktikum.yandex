import Handlebars from "handlebars";
import './message-footer.css';
export { default as MessageFooter } from './message-footer.hbs?raw';

Handlebars.registerHelper("popup-attach", () => {
    return [
        {
            img: "/assets/svg/photo-video.svg",
            url: "/",
            text: "Фото или Видео",
        },
        {
            img: "/assets/svg/file.svg",
            url: "/",
            text: "Файл",
        },
        {
            img: "/assets/svg/location.svg",
            url: "/",
            text: "Локация",
        }
    ]
});
