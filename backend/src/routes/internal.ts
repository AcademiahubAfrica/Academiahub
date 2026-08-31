import { Router, Request, Response } from "express";
import { sendToUser } from "../ws/connections";
import { requestContext, securityLog } from "../lib/securityLog";

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
      /* This endpoint is only ever called by our own web app, so a failure
         here is either a misconfigured deploy or somebody outside guessing at
         the shared secret. Neither should pass unremarked. */
      securityLog({
        event: "internal.auth.failed",
        outcome: "failure",
        request: requestContext(req.headers, {
          method: req.method,
          path: req.originalUrl,
        }),
        detail: { reason: authHeader ? "wrong_secret" : "no_authorization_header" },
      });
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
