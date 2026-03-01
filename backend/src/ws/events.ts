import { Socket } from "socket.io";
import prisma from "../lib/prisma";
import { sendToUser, getOtherParticipantId } from "./connections";
import {
  MessageSendPayload,
  ReadMarkPayload,
  TypingPayload,
} from "../types";

// ─── Rate Limiting & Sanitization ───────────────────────

const MAX_MESSAGES_PER_MINUTE = 30;
const MAX_MESSAGE_LENGTH = 5000;
const READ_DEBOUNCE_MS = 5000;

/** Tracks message rate per user: userId → timestamps of recent messages */
const messageRateMap = new Map<string, number[]>();

/** Tracks read:mark debounce: "conversationId:userId" → last upsert timestamp */
const readDebounceMap = new Map<string, number>();

function checkMessageRate(userId: string): boolean {
  const now = Date.now();
  const windowStart = now - 60_000;

  let timestamps = messageRateMap.get(userId);
  if (!timestamps) {
    timestamps = [];
    messageRateMap.set(userId, timestamps);
  }

  const filtered = timestamps.filter((t) => t > windowStart);
  messageRateMap.set(userId, filtered);

  if (filtered.length >= MAX_MESSAGES_PER_MINUTE) {
    return false;
  }

  filtered.push(now);
  return true;
}

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "");
}

// ─── Event Handlers ─────────────────────────────────────

export async function handleMessageSend(
  socket: Socket,
  userId: string,
  payload: MessageSendPayload
): Promise<void> {
  const { conversationId, content } = payload;

  if (!conversationId || typeof conversationId !== "string") {
    socket.emit("error", { message: "Invalid conversationId" });
    return;
  }

  if (!content || typeof content !== "string") {
    socket.emit("error", { message: "Message content is required" });
    return;
  }

  const sanitized = stripHtml(content).trim();

  if (sanitized.length === 0 || sanitized.length > MAX_MESSAGE_LENGTH) {
    socket.emit("error", {
      message: `Message must be 1–${MAX_MESSAGE_LENGTH} characters`,
    });
    return;
  }

  if (!checkMessageRate(userId)) {
    socket.emit("error", { message: "Rate limit exceeded. Slow down." });
    return;
  }

  try {
    // Verify sender is a participant
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      socket.emit("error", { message: "Conversation not found" });
      return;
    }

    if (
      conversation.participantAId !== userId &&
      conversation.participantBId !== userId
    ) {
      socket.emit("error", { message: "Forbidden" });
      return;
    }

    // Persist — senderId always derived from authenticated socket
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId: userId,
        content: sanitized,
      },
    });

    // ACK to sender
    socket.emit("message:ack", { msgId: message.id });

    // Push to both participants
    const recipientId = getOtherParticipantId(conversation, userId);
    sendToUser(recipientId, "message:new", message);
    sendToUser(userId, "message:new", message);
  } catch (err) {
    console.error("message:send error:", err);
    socket.emit("error", { message: "Failed to send message" });
  }
}

export async function handleReadMark(
  socket: Socket,
  userId: string,
  payload: ReadMarkPayload
): Promise<void> {
  const { conversationId, lastMsgId } = payload;

  if (
    !conversationId ||
    typeof conversationId !== "string" ||
    !lastMsgId ||
    typeof lastMsgId !== "string"
  ) {
    socket.emit("error", { message: "Invalid read:mark payload" });
    return;
  }

  // Server-side debounce
  const debounceKey = `${conversationId}:${userId}`;
  const lastUpsert = readDebounceMap.get(debounceKey) ?? 0;
  if (Date.now() - lastUpsert < READ_DEBOUNCE_MS) {
    return;
  }

  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) return;

    if (
      conversation.participantAId !== userId &&
      conversation.participantBId !== userId
    ) {
      return;
    }

    // Verify lastMsgId belongs to this conversation
    const message = await prisma.message.findFirst({
      where: { id: lastMsgId, conversationId },
      select: { id: true },
    });

    if (!message) {
      socket.emit("error", { message: "Message not found in conversation" });
      return;
    }

    await prisma.readReceipt.upsert({
      where: {
        conversationId_userId: { conversationId, userId },
      },
      update: { lastReadMessageId: lastMsgId, readAt: new Date() },
      create: { conversationId, userId, lastReadMessageId: lastMsgId },
    });

    readDebounceMap.set(debounceKey, Date.now());

    // Notify the other participant
    const recipientId = getOtherParticipantId(conversation, userId);
    sendToUser(recipientId, "read:update", {
      conversationId,
      userId,
      lastMsgId,
    });
  } catch (err) {
    console.error("read:mark error:", err);
  }
}

export async function handleTyping(
  socket: Socket,
  userId: string,
  payload: TypingPayload,
  isTyping: boolean
): Promise<void> {
  const { conversationId } = payload;

  if (!conversationId || typeof conversationId !== "string") return;

  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) return;

    if (
      conversation.participantAId !== userId &&
      conversation.participantBId !== userId
    ) {
      return;
    }

    const recipientId = getOtherParticipantId(conversation, userId);
    sendToUser(recipientId, "typing", {
      conversationId,
      userId,
      isTyping,
    });
  } catch (err) {
    console.error("typing error:", err);
  }
}
