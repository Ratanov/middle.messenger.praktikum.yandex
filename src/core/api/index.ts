import { IChat, IUser } from '../types/api';
import UserApi from './user';
import ChatApi from './chat';

const userApi = new UserApi();
const chatApi = new ChatApi();

const errorHandler = <T>(response: any): T => {
  if (response?.reason) {
    throw new Error(response.reason);
  }
  return response as T;
};

export const api = {
  signUp: async (data: IUser.SignUpRequest): Promise<IUser.SignUpResponse> => {
    const response = await userApi.create(data);
    return errorHandler<IUser.SignUpResponse>(response);
  },
  signIn: async (data: IUser.SignInRequest): Promise<IUser.SignInResponse> => {
    const response = await userApi.login(data);
    return errorHandler<IUser.SignInResponse>(response);
  },
  userInfo: async (): Promise<IUser.InfoResponse> => {
    const response = await userApi.info();
    return errorHandler<IUser.InfoResponse>(response);
  },
  logout: async (): Promise<IUser.LogoutResponse> => {
    const response = await userApi.logout();
    return errorHandler<IUser.LogoutResponse>(response);
  },
  changeInfo: async (data: IUser.InfoResponse): Promise<IUser.InfoResponse> => {
    const response = await userApi.changeInfo(data);
    return errorHandler<IUser.InfoResponse>(response);
  },
  changePassword: async (
    data: IUser.PasswordRequest,
  ): Promise<IUser.PasswordResponse> => {
    const response = await userApi.changePassword(data);
    return errorHandler<IUser.PasswordResponse>(response);
  },
  changeAvatar: async (data: FormData): Promise<IUser.InfoResponse> => {
    const response = await userApi.changeAvatar(data);
    return errorHandler<IUser.InfoResponse>(response);
  },
  getChats: async (
    data?: IChat.GETChatUsersRequest,
  ): Promise<IChat.GETChatsResponse[]> => {
    const response = await chatApi.getChats(data);
    return errorHandler<IChat.GETChatsResponse[]>(response);
  },
  createChat: async (
    data?: IChat.CreateChatRequest,
  ): Promise<IChat.CreateChatResponse> => {
    const response = await chatApi.createChat(data);
    return errorHandler<IChat.CreateChatResponse>(response);
  },
  changeChatAvatar: async (data: FormData): Promise<IChat.GETChatsResponse> => {
    const response = await chatApi.changeAvatar(data);
    return errorHandler<IChat.GETChatsResponse>(response);
  },
  deleteChat: async (data: { chatId: number }): Promise<void> => {
    const response = await chatApi.deleteChat(data);
    return errorHandler<void>(response);
  },
  searchUser: async (
    data: IChat.GETChatUsersRequest,
  ): Promise<IUser.InfoResponse[]> => {
    const response = await chatApi.searchChatUsers(data);
    return errorHandler<IUser.InfoResponse[]>(response);
  },
  addUserToChat: async (data: IChat.AddUserToChatRequest): Promise<void> => {
    const response = await chatApi.addUserToChat(data);
    return errorHandler<void>(response);
  },
  getChatUsers: async (
    data: IChat.GetChatUsersRequest,
  ): Promise<IChat.GetChatUsersResponse[]> => {
    const response = await chatApi.getChatUsers(data);
    return errorHandler<IChat.GetChatUsersResponse[]>(response);
  },
  deleteChatUsers: async (data: IChat.DeleteChatUsers): Promise<void> => {
    const response = await chatApi.deleteChatUsers(data);
    return errorHandler<void>(response);
  },
  getToken: async (
    data: IChat.GetChatTokenRequest,
  ): Promise<IChat.GetChatTokenResponse> => {
    const response = await chatApi.getChatToken(data);
    return errorHandler<IChat.GetChatTokenResponse>(response);
  },
};
