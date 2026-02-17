import { Router, Request, Response } from "express";
import "../types";
import prisma from "../lib/prisma";
import { verifySession } from "../middleware/verifySession";
import { searchLimiter } from "../middleware/rateLimit";

const router = Router();

/**
 * GET /users/search?q=
 * Search for users by name to start a DM.
 * Requires minimum 3 characters. Returns max 10 results.
 * Excludes the requesting user from results.
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

      const sanitizedQuery = query.trim();

      const users = await prisma.user.findMany({
        where: {
          id: { not: userId },
          name: {
            startsWith: sanitizedQuery,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
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
