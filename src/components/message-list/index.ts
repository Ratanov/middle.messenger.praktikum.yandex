import Handlebars from "handlebars";
import "./message-list.css";

export { default as MessageList } from "./message-list.hbs?raw";

Handlebars.registerHelper("message", () => {
  return [
    {
      text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
      date: "11:50",
      incoming: true
    },
    {
      text: "2",
      date: "11:49",
      incoming: true,
    },
    {
      text: "3",
      date: "12:49",
      incoming: false,
    },
    {
      text: "4",
      date: "14:49",
      incoming: true,
    },
    {
      photo: '/assets/camera.png',
      date: "14:49",
      incoming: true,
    }
  ];
});