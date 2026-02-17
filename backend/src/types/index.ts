import { Conversation } from "../generated/prisma";

// ─── Augment Express Request globally ───────────────────

declare global {
  namespace Express {
    interface Request {
      userId: string;
      conversation?: Conversation;
    }
  }
}

// ─── Socket.IO Event Types ──────────────────────────────

// Client → Server
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

// Server → Client payloads are typed inline on emit
