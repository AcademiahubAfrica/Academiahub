import rateLimit, { type Options } from "express-rate-limit";
import { Request, Response } from "express";
import "../types";
import { requestContext, securityLog } from "../lib/securityLog";

const MESSAGE = { error: "Too many requests. Please try again later." };

/**
 * Shared handler so every limiter reports itself the same way. Hitting a limit
 * is not proof of anything on its own — a flaky connection retrying looks much
 * the same — but it is the number that turns "one odd request" into "this
 * account has been going at it for an hour".
 */
function onLimitExceeded(limitName: string) {
  return (req: Request, res: Response, _next: unknown, options: Options): void => {
    securityLog({
      event: "ratelimit.exceeded",
      outcome: "failure",
      userId: req.userId,
      request: requestContext(req.headers, {
        method: req.method,
        path: req.originalUrl,
      }),
      detail: { limit: limitName, max: options.limit, windowMs: options.windowMs },
    });
    res.status(options.statusCode).json(MESSAGE);
  };
}

/**
 * Rate limiter for user search endpoint.
 * 20 requests per minute per user.
 */
export const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  keyGenerator: (req) => req.userId || "unknown",
  handler: onLimitExceeded("user_search"),
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter for conversation creation.
 * 10 new conversations per hour per user.
 */
export const conversationCreateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  keyGenerator: (req) => req.userId || "unknown",
  handler: onLimitExceeded("conversation_create"),
  standardHeaders: true,
  legacyHeaders: false,
});
