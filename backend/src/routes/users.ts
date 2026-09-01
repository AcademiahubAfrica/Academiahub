import { Router, Request, Response } from "express";
import "../types";
import prisma from "../lib/prisma";
import { verifySession } from "../middleware/verifySession";
import { searchLimiter } from "../middleware/rateLimit";

const router = Router();

// Names are short; anything longer is not a search. 
const MAX_SEARCH_QUERY_LENGTH = 100;

/**
 * GET /users/search?q=
 * Search for users by name to start a DM.
 * Requires minimum 3 characters. Returns max 10 results.
 * Excludes the requesting user, and anyone who has turned off `showInSearch`.
 */
router.get(
  "/search",
  verifySession,
  searchLimiter,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const query = req.query.q as string | undefined;
      const userId = req.userId;

      if (!query || query.trim().length < 3) {
        res.status(400).json({ error: "Query must be at least 3 characters" });
        return;
      }

      /* There is no body size limit on a query string, so this had no ceiling
         at all. The column it searches is far shorter than this. */
      if (query.trim().length > MAX_SEARCH_QUERY_LENGTH) {
        res.status(400).json({
          error: `Query must be at most ${MAX_SEARCH_QUERY_LENGTH} characters`,
        });
        return;
      }

      const sanitizedQuery = query.trim();

      const users = await prisma.user.findMany({
        where: {
          id: { not: userId },
          showInSearch: true,
          name: {
            startsWith: sanitizedQuery,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
          image: true,
        },
        take: 10,
      });

      res.status(200).json(users);
    } catch {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

export default router;
