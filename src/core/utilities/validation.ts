import { TValidationResult } from './validationType';
import { regex } from './';

export const validationEmail = (email: string): TValidationResult => {
  const result = regex.isValidEmail.test(email);
  return {
    result,
    message: result ? '' : 'Некорректный email',
  };
};

export const validationLogin = (login: string): TValidationResult => {
  const minLength = 3;
  const maxLength = 20;

  const isValidLength = login.length >= minLength && login.length <= maxLength;
  const hasSpaces = regex.hasSpaces.test(login);
  const isOnlyNumbers = regex.isOnlyNumbers.test(login);
  const hasInvalidCharsLogin = regex.hasInvalidCharsLogin.test(login);

  if (!isValidLength) {
    return {
      result: false,
      message: `Должен содержать от ${minLength} до ${maxLength} символов`,
    };
  }

  if (hasSpaces) {
    return { 
      result: false, 
      message: 'Не может содержать пробелы' };
  }

  if (isOnlyNumbers) {
    return { 
      result: false, 
      message: 'Не может содержать только цифры' };
  }

  if (!hasInvalidCharsLogin) {
    return {
      result: false,
      message:
        'Может содержать только латинские буквы, цифры, дефис и нижнее подчеркивание',
    };
  }

  return { result: true };
};

export const validationName = (name: string): TValidationResult => {
  const minLength = 2;
  const maxLength = 20;

  const isValidLength = name.length >= minLength && name.length <= maxLength;
  const hasSpaces = regex.hasSpaces.test(name);
  const isOnlyNumbers = regex.isOnlyNumbers.test(name);
  const hasInvalidCharsName = regex.hasInvalidCharsName.test(name);
  const isFirstLetterUppercase = regex.isFirstLetterUppercase.test(name);

  if (!isValidLength) {
    return {
      result: false,
      message: `Должно содержать от ${minLength} до ${maxLength} символов`,
    };
  }

  if (hasSpaces) {
    return { result: false, message: 'Не может содержать пробелы' };
  }

  if (isOnlyNumbers) {
    return { result: false, message: 'Не может содержать только цифры' };
  }

  if (!hasInvalidCharsName) {
    return {
      result: false,
      message: 'Может содержать только латиницу, кириллицу и дефис',
    };
  }

  if (!isFirstLetterUppercase) {
    return {
      result: false,
      message: 'Должно начинаться с заглавной буквы',
    };
  }

  return { result: true };
};

export const validationPhone = (phone: string): TValidationResult => {
  const minLength = 10;
  const maxLength = 15;
  const isValidLength = phone.length >= minLength && phone.length <= maxLength;
  const isOnlyNumbers = regex.isOnlyNumbers.test(phone);

  if (!isValidLength) {
    return {
      result: false,
      message: `Должен содержать от ${minLength} до ${maxLength} цифр`,
    };
  }

  if (!isOnlyNumbers) {
    return { result: false, message: 'Должен содержать только цифры' };
  }

  return { result: true };
};

export const validationPassword = (password: string): TValidationResult => {
  const minLength = 6;
  const maxLength = 40;

  const isValidLength = password.length >= minLength && password.length <= maxLength;
  const isUppercase = regex.isUppercase.test(password);
  const isHaveNumber = regex.isHaveNumber.test(password);

  if (!isValidLength) {
    return {
      result: false,
      message: `Должен содержать от ${minLength} до ${maxLength} символов`,
    };
  }

  if (!isUppercase) {
    return {
      result: false,
      message: 'Должен содержать хотя бы одну заглавную букву',
    };
  }

  if (!isHaveNumber) {
    return {
      result: false,
      message: 'Должен содержать хотя бы одну цифру',
    };
  }

  return { result: true };
};
