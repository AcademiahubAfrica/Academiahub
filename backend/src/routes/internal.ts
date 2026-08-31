import crypto from "crypto";
import { Router, Request, Response } from "express";
import { sendToUser } from "../ws/connections";
import { requestContext, securityLog } from "../lib/securityLog";

const router = Router();

/**
 * Read per call, not captured at import.
 *
 * Whether the environment has been loaded by the time this module is first
 * required depends on what imported it and in what order — Prisma happens to
 * load `.env` as a side effect of being imported, which is luck, not design. A
 * captured `undefined` would close this endpoint permanently and silently.
 */
function internalSecret(): string | undefined {
  return process.env.INTERNAL_API_SECRET;
}

if (!internalSecret()) {
  /* Loud, but not fatal. The comparison below refuses everything without a
     secret, so the endpoint is closed rather than open — and taking the whole
     process down over a notification secret would stop messaging too, which is
     what this service actually exists to do. */
  console.error(
    "INTERNAL_API_SECRET is not set — POST /internal/notify will refuse every request",
  );
}

/**
 * Compares two values in time that does not depend on how much of them matches.
 *
 * A plain `!==` returns as soon as two bytes differ, so how long it took is a
 * measure of how many leading characters were right — enough, in principle, to
 * recover the secret one character at a time. Hashing first also means the two
 * buffers are always 32 bytes, so nothing leaks through length either.
 */
function matchesSecret(given: string | undefined): boolean {
  const secret = internalSecret();

  // No secret configured means nothing can match. Fails closed.
  if (!secret) return false;

  const digest = (value: string): Buffer =>
    crypto.createHash("sha256").update(value).digest();

  return crypto.timingSafeEqual(digest(given ?? ""), digest(`Bearer ${secret}`));
}

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
    if (!matchesSecret(authHeader)) {
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
        detail: {
          reason: !internalSecret()
            ? "secret_not_configured"
            : authHeader
              ? "wrong_secret"
              : "no_authorization_header",
        },
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
