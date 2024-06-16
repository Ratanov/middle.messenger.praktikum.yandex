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
