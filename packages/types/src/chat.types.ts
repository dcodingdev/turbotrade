// Shared between chat-service and apps/web for end-to-end type safety

export interface ChatMessage {
  _id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: Date | string;
}

export interface Conversation {
  id: string;
  title?: string | null;
  participantIds: string[];
  lastMessageAt?: Date | string | null;
  lastMessagePreview?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface SocketServerToClientEvents {
  new_message: (message: ChatMessage) => void;
  user_typing: (payload: TypingPayload) => void;
  user_stopped_typing: (payload: TypingPayload) => void;
  message_read: (payload: ReadReceiptPayload) => void;
  error: (message: string) => void;
}

export interface SocketClientToServerEvents {
  join_room: (payload: { conversationId: string }) => void;
  leave_room: (payload: { conversationId: string }) => void;
  send_message: (payload: { conversationId: string; body: string }) => void;
  typing: (payload: { conversationId: string }) => void;
  stop_typing: (payload: { conversationId: string }) => void;
  mark_read: (payload: ReadReceiptPayload) => void;
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
