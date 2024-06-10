export interface GETChatsResponse {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
}

export interface GETChatUsersRequest {
  title?: string;
  login?: string;
}

export interface CreateChatRequest {
  title: string;
}

export interface CreateChatResponse {
  id: number;
}

export interface AddUserToChatRequest {
  users: number[];
  chatId: number;
}

export interface DeleteChatUsers extends AddUserToChatRequest {}

export interface GetChatUsersResponse {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  role: string;
}

export interface GetChatUsersRequest {
  id: number;
}

export interface GetChatTokenRequest {
  chatId: number;
}

export interface GetChatTokenResponse {
  token: string;
}

export interface WSMessage {
  chat_id: number;
  content: string;
  file: string | null;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}

export interface WSMessageExt extends WSMessage {
  createdBy: number;
  firstName: string;
}
