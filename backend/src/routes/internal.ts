import { Router, Request, Response } from "express";
import { sendToUser } from "../ws/connections";

const router = Router();

/**
 * POST /internal/notify
 * Push a notification to a user via Socket.IO.
 * Called by the Next.js API routes after creating a notification in the DB.
 *
 * Authenticated via shared INTERNAL_API_SECRET.
 */
router.post(
  "/notify",
  (req: Request, res: Response): void => {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.INTERNAL_API_SECRET}`) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { userId, notification } = req.body;

    if (!userId || !notification) {
      res.status(400).json({ error: "userId and notification are required" });
      return;
    }

    sendToUser(userId, "notification:new", notification);

    res.status(200).json({ sent: true });
  }
);

export default router;
