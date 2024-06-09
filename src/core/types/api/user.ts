export interface SignUpRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export type SignUpResponse = {
  id: number;
};

export interface SignInRequest {
  login: string;
  password: string;
}

export type SignInResponse = 'Ok';

export type InfoResponse = {
  id: 123;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};

export type LogoutResponse = 'Ok';

export interface PasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export type PasswordResponse = 'Ok';
