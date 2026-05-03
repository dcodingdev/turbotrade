import { Socket, Server } from "socket.io";

export interface AuthenticatedUser {
  _id: string;
  email: string;
  role: string;
}

export interface MessagePayload {
  _id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: Date;
}

export interface SendMessagePayload {
  conversationId: string;
  body: string;
}

export interface TypingPayload {
  conversationId: string;
  userId: string;
}

export interface ReadReceiptPayload {
  conversationId: string;
  messageId: string;
  userId: string;
}

export interface ServerToClientEvents {
  new_message: (message: MessagePayload) => void;
  user_typing: (payload: TypingPayload) => void;
  user_stopped_typing: (payload: TypingPayload) => void;
  message_read: (payload: ReadReceiptPayload) => void;
  error: (message: string) => void;
}

export interface ClientToServerEvents {
  join_room: (payload: { conversationId: string }) => void;
  leave_room: (payload: { conversationId: string }) => void;
  send_message: (payload: SendMessagePayload) => void;
  typing: (payload: TypingPayload) => void;
  stop_typing: (payload: TypingPayload) => void;
  mark_read: (payload: ReadReceiptPayload) => void;
}

export interface SocketData {
  user: AuthenticatedUser;
}

export type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;
export type TypedServer = Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;
