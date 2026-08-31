import { Request, Response, NextFunction } from "express";
import "../types";
import prisma from "../lib/prisma";
import { requestContext, securityLog } from "../lib/securityLog";

/**
 * Middleware that verifies the authenticated user is a participant
 * in the conversation specified by req.params.id.
 *
 * Must be used AFTER verifySession middleware.
 * Attaches the conversation to req.conversation on success.
 */
export async function requireParticipant(
  req: Request,
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
      /* The sharpest signal this service produces. Reaching a conversation you
         are not in is not something the UI can do by accident — it means a
         valid session was pointed at somebody else's identifier on purpose. */
      securityLog({
        event: "authz.denied",
        outcome: "failure",
        userId,
        request: requestContext(req.headers, {
          method: req.method,
          path: req.originalUrl,
        }),
        detail: { reason: "not_a_participant", conversationId },
      });
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    req.conversation = conversation;
    next();
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
}
