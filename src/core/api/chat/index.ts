import { HTTPTransport } from '../../../core/httpTransport'
import { IChat, IUser } from '../../../core/types';
import { ApiError } from '../../../core/types';

const transport = new HTTPTransport('');

export default class ChatApi {
  async getChats(data?: IChat.GETChatUsersRequest): Promise<IChat.GETChatsResponse[] | ApiError> {
    return transport.get('/chats', { data });
  }

  async createChat(data?: IChat.CreateChatRequest): Promise<IChat.CreateChatResponse | ApiError> {
    return transport.post<IChat.CreateChatResponse>('/chats', { data });
  }

  async changeAvatar(data: FormData): Promise<IChat.GETChatsResponse | ApiError> {
    return transport.put<IChat.GETChatsResponse>('/chats/avatar', { data });
  }

  async deleteChat(data: { chatId: number }): Promise<void | ApiError> {
    return transport.delete<void>('/chats', { data });
  }

  async searchChatUsers(data: IChat.GETChatUsersRequest): Promise<IUser.InfoResponse[] | ApiError> {
    return transport.post<IUser.InfoResponse[]>('/user/search', { data });
  }

  async addUserToChat(data: IChat.AddUserToChatRequest): Promise<void | ApiError> {
    return transport.put<void>('/chats/users', { data });
  }

  async getChatUsers(data: IChat.GetChatUsersRequest): Promise<IChat.GetChatUsersResponse[] | ApiError> {
    return transport.get<IChat.GetChatUsersResponse[]>(`/chats/${data.id}/users`);
  }

  async deleteChatUsers(data: IChat.DeleteChatUsers): Promise<void | ApiError> {
    return transport.delete<void>('/chats/users', { data });
  }

  async getChatToken(data: IChat.GetChatTokenRequest): Promise<IChat.GetChatTokenResponse | ApiError> {
    return transport.post<IChat.GetChatTokenResponse>(`/chats/token/${data.chatId}`, { data });
  }
}
