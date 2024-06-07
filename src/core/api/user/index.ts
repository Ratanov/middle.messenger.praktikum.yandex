import { HTTPTransport } from '../../../core/httpTransport'
import { IUser } from '../../../core/types';
import { ApiError } from '../../../core/types';

const transport = new HTTPTransport('');

export default class UserApi {
  async create(data: IUser.SignUpRequest): Promise<IUser.SignUpResponse | ApiError> {
    return transport.post<IUser.SignUpResponse>('/auth/signup', { data });
  }

  async login(data: IUser.SignInRequest): Promise<IUser.SignInResponse | ApiError> {
    return transport.post<IUser.SignInResponse>('/auth/signin', { data });
  }

  async info(): Promise<IUser.InfoResponse | ApiError> {
    return transport.get('/auth/user');
  }

  async logout(): Promise<IUser.LogoutResponse | ApiError> {
    return transport.post('/auth/logout');
  }

  async changeInfo(data: IUser.InfoResponse): Promise<IUser.InfoResponse | ApiError> {
    return transport.put<IUser.InfoResponse>('/user/profile', { data });
  }

  async changePassword(data: IUser.PasswordRequest): Promise<IUser.PasswordResponse | ApiError> {
    return transport.put<IUser.PasswordResponse>('/user/password', { data });
  }

  async changeAvatar(data: FormData): Promise<IUser.InfoResponse | ApiError> {
    return transport.put<IUser.InfoResponse>('/user/profile/avatar', { data });
  }
}
