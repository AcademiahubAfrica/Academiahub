import { Router, Request, Response } from "express";
import "../types";
import prisma from "../lib/prisma";
import { verifySession } from "../middleware/verifySession";
import { requireParticipant } from "../middleware/requireParticipant";

const router = Router();

/**
 * GET /conversations/:id/messages
 * Fetch paginated message history for a conversation.
 * Query params:
 *   - cursor: message ID to paginate from (optional)
 *   - limit: number of messages to return (default 50, max 100)
 */
router.get(
  "/:id/messages",
  verifySession,
  requireParticipant,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const conversationId = req.params.id as string;
      const cursor = req.query.cursor as string | undefined;
      const limitParam = parseInt(req.query.limit as string, 10);
      const limit = Math.min(Math.max(limitParam || 50, 1), 100);

      const messages = await prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: "desc" },
        take: limit + 1, // fetch one extra to determine if there's a next page
        ...(cursor
          ? {
              skip: 1,
              cursor: { id: cursor },
            }
          : {}),
      });

      const hasMore = messages.length > limit;
      const results = hasMore ? messages.slice(0, limit) : messages;
      const nextCursor = hasMore ? results[results.length - 1].id : null;

      res.status(200).json({
        messages: results,
        nextCursor,
      });
    } catch {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

export default router;
