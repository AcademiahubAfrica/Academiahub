// ─── REST API Response Types ───────────────────────────────────────────

export interface UserSummary {
  id: string;
  name: string | null;
  image: string | null;
}

export interface UserSearchResult {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
}

export interface ConversationListItem {
  id: string;
  otherParticipant: UserSummary;
  lastMessage: {
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
  } | null;
  lastReadMessageId: string | null;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantAId: string;
  participantBId: string;
  createdAt: string;
  participantA: UserSummary;
  participantB: UserSummary;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface MessagePage {
  messages: Message[];
  nextCursor: string | null;
}

export interface ReadReceipt {
  id: string;
  conversationId: string;
  userId: string;
  lastReadMessageId: string;
  readAt: string;
  user: { id: string; name: string | null };
}

// ─── Socket.IO Event Payloads ──────────────────────────────────────────

/** Client → Server */
export interface MessageSendPayload {
  conversationId: string;
  content: string;
}

export interface ReadMarkPayload {
  conversationId: string;
  lastMsgId: string;
}

export interface TypingPayload {
  conversationId: string;
}

/** Server → Client */
export interface MessageAckPayload {
  msgId: string;
}

export interface MessageNewPayload {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface ReadUpdatePayload {
  conversationId: string;
  userId: string;
  lastMsgId: string;
}

export interface TypingEventPayload {
  conversationId: string;
  userId: string;
  isTyping: boolean;
}

export interface PresencePayload {
  userId: string;
  status: "online" | "offline";
}

export interface SocketErrorPayload {
  message: string;
}

// ─── Socket Event Maps (for type-safe emit/on) ────────────────────────

export interface ClientToServerEvents {
  "message:send": (payload: MessageSendPayload) => void;
  "read:mark": (payload: ReadMarkPayload) => void;
  "typing:start": (payload: TypingPayload) => void;
  "typing:stop": (payload: TypingPayload) => void;
}

export interface ServerToClientEvents {
  "message:ack": (payload: MessageAckPayload) => void;
  "message:new": (payload: MessageNewPayload) => void;
  "read:update": (payload: ReadUpdatePayload) => void;
  typing: (payload: TypingEventPayload) => void;
  presence: (payload: PresencePayload) => void;
  error: (payload: SocketErrorPayload) => void;
}
