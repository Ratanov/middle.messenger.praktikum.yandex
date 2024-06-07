export * as constants from './const';
export * as validations from './validation';

export const regex = {
  // eslint-disable-next-line
  isValidEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  isOnlyNumbers: /^\d+$/,
  hasSpaces: /\s/,
  hasInvalidCharsLogin: /^[a-zA-Z0-9_-]*$/,
  hasInvalidCharsName: /^[a-zA-Zа-яА-Я-]*$/,
  isFirstLetterUppercase: /^[A-ZА-ЯЁ]/,
  isUppercase: /[A-ZА-ЯЁ]/,
  isHaveNumber: /\d/,
};

export const convertToHHMM = (isoTime: string | undefined): string => {
  if (!isoTime) {
    return '??:??';
  }
  const date = new Date(isoTime);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
