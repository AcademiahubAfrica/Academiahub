import { Socket } from "socket.io";
import prisma from "../lib/prisma";

// ─── In-Memory State ────────────────────────────────────

/** Maps userId → Set of connected sockets (supports multi-tab) */
export const userSockets = new Map<string, Set<Socket>>();

/** Maps socket.id → userId for quick lookup on disconnect */
export const socketUserMap = new Map<string, string>();

export const MAX_CONNECTIONS_PER_USER = 5;

// ─── Connection Helpers ─────────────────────────────────

/** Registers a socket for a user. Returns false if max connections exceeded. */
export function addSocket(userId: string, socket: Socket): boolean {
  let sockets = userSockets.get(userId);
  if (!sockets) {
    sockets = new Set();
    userSockets.set(userId, sockets);
  }

  if (sockets.size >= MAX_CONNECTIONS_PER_USER) {
    return false;
  }

  sockets.add(socket);
  socketUserMap.set(socket.id, userId);
  return true;
}

/** Removes a socket on disconnect. Returns the userId or null. */
export function removeSocket(socket: Socket): string | null {
  const userId = socketUserMap.get(socket.id);
  if (!userId) return null;

  socketUserMap.delete(socket.id);

  const sockets = userSockets.get(userId);
  if (sockets) {
    sockets.delete(socket);
    if (sockets.size === 0) {
      userSockets.delete(userId);
    }
  }

  return userId;
}

/** Emits an event to all of a user's connected sockets. */
export function sendToUser(userId: string, event: string, payload: unknown): void {
  const sockets = userSockets.get(userId);
  if (!sockets) return;
  for (const socket of sockets) {
    socket.emit(event, payload);
  }
}

/** Returns true if the user has at least one active socket. */
export function isUserOnline(userId: string): boolean {
  const sockets = userSockets.get(userId);
  return !!sockets && sockets.size > 0;
}

/** Given a conversation and a userId, returns the other participant's ID. */
export function getOtherParticipantId(
  conversation: { participantAId: string; participantBId: string },
  userId: string
): string {
  return conversation.participantAId === userId
    ? conversation.participantBId
    : conversation.participantAId;
}

// ─── Presence ───────────────────────────────────────────

/** Broadcasts online/offline status to all conversation partners of the user. */
export async function broadcastPresence(
  userId: string,
  status: "online" | "offline"
): Promise<void> {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [{ participantAId: userId }, { participantBId: userId }],
      },
      select: { participantAId: true, participantBId: true },
    });

    const notifiedUsers = new Set<string>();

    for (const convo of conversations) {
      const partnerId = getOtherParticipantId(convo, userId);
      if (!notifiedUsers.has(partnerId)) {
        notifiedUsers.add(partnerId);
        sendToUser(partnerId, "presence", { userId, status });
      }
    }
  } catch (err) {
    console.error("Failed to broadcast presence:", err);
  }
}
