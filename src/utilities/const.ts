
import cat1 from '/assets/01.jpg';
import cat2 from '/assets/02.jpg';
import cat3 from '/assets/03.jpg';

export const profileInfoProps: {
  name: string;
  label: string;
  defaultValue?: string;
  readonly?: boolean;
}[] = [
  {
    name: 'email',
    label: 'Почта',
    defaultValue: 'pochta@yandex.ru',
    readonly: true,
  },
  {
    name: 'login',
    label: 'Логин',
    defaultValue: 'ratanovoleg',
    readonly: true,
  },
  {
    name: 'first_name',
    label: 'Имя',
    defaultValue: 'Олег',
    readonly: true,
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    defaultValue: 'Ратанов',
    readonly: true,
  },
  {
    name: 'display_name',
    label: 'Имя в чате',
    defaultValue: 'Олег',
    readonly: true,
  },
  {
    name: 'phone',
    label: 'Телефон',
    defaultValue: '+7 960 087 87 08',
    readonly: true,
  },
];

export const popupUserProps: {
  img: string;
  url: string;
  text: string;
}[] = [
  {
    img: '/assets/svg/plus.svg',
    url: '#modal_add_user',
    text: 'Добавить пользователя',
  },
  {
    img: '/assets/svg/cross.svg',
    url: '#modal_remove_user',
    text: 'Удалить пользователя',
  },
];

export const popupAttachProps: {
  img: string;
  url: string;
  text: string;
}[] = [
  {
    img: '/assets/svg/photo-video.svg',
    url: '/',
    text: 'Фото или Видео',
  },
  {
    img: '/assets/svg/file.svg',
    url: '/',
    text: 'Файл',
  },
  {
    img: '/assets/svg/location.svg',
    url: '/',
    text: 'Локация',
  },
];

export const chatListProps: {
  title: string;
  avatar: string;
  date: string;
  desc: string;
  newMessage?: number;
  active?: boolean;
}[] = [
  {
    title: 'Андрей',
    avatar: cat1,
    date: '10:49',
    desc: 'Description cat-1 meow',
    newMessage: 3,
  },
  {
    title: 'Вадим',
    avatar: cat2,
    date: '12:00',
    desc: 'Вы: Круто!',
    active: true,
  },
  {
    title: 'cat-3',
    avatar: cat3,
    date: '15:12',
    desc: 'Description cat-3 cat-3 cat-3',
    newMessage: 1,
  },
  {
    title: 'cat-1',
    avatar: cat1,
    date: 'Пт',
    desc: 'Description cat-1 meow',
  },
  {
    title: 'cat-2',
    avatar: cat2,
    date: 'Ср',
    desc: 'Description cat-2 cat-2 meow meow',
  },
  {
    title: 'cat-3',
    avatar: cat3,
    date: 'Пн',
    desc: 'Description cat-3 cat-3 cat-3',
  },
  { title: 'cat-2', avatar: cat2, date: 'Пт', desc: 'meow' },
  { title: 'cat-2', avatar: cat2, date: '1 Мая 2020', desc: 'meow' },
  { title: 'cat-2', avatar: cat2, date: '12 Апр 2020', desc: 'meow' },
];

export const messageListProps: {
  text?: string;
  photo?: string;
  date: string;
  incoming: boolean;
}[] = [
  {
    text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
    date: '11:50',
    incoming: true,
  },
  {
    text: '2',
    date: '11:49',
    incoming: true,
  },
  {
    text: '3',
    date: '12:49',
    incoming: false,
  },
  {
    text: '4',
    date: '14:49',
    incoming: true,
  },
  {
    photo: '/assets/camera.png',
    date: '14:49',
    incoming: true,
  },
];
