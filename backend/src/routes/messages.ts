import { Router, Request, Response } from "express";
import "../types";
import prisma from "../lib/prisma";
import { verifySession } from "../middleware/verifySession";
import { requireParticipant } from "../middleware/requireParticipant";
import { objectIdOrUndefined, positiveInt } from "../lib/queryParams";

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
      /* Dropped rather than rejected when malformed: a bad cursor should
         return the first page, not an error. Passing it on would reach Prisma
         as an invalid ObjectId and raise. */
      const cursor = objectIdOrUndefined(req.query.cursor);
      const limit = positiveInt(req.query.limit, 50, 100);

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
