import { Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import { AuthenticatedRequest } from "../types";

/**
 * Middleware that verifies the authenticated user is a participant
 * in the conversation specified by req.params.id.
 *
 * Must be used AFTER verifySession middleware.
 * Attaches the conversation to req.conversation on success.
 */
export async function requireParticipant(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const conversationId = req.params.id as string | undefined;
  const userId = req.userId;

  if (!conversationId || typeof conversationId !== "string") {
    res.status(400).json({ error: "Conversation ID is required" });
    return;
  }

  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    if (
      conversation.participantAId !== userId &&
      conversation.participantBId !== userId
    ) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    req.conversation = conversation;
    next();
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
}
