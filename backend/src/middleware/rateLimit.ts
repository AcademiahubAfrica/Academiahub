import rateLimit from "express-rate-limit";
import { AuthenticatedRequest } from "../types";

/**
 * Rate limiter for user search endpoint.
 * 20 requests per minute per user.
 */
export const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  keyGenerator: (req) => (req as AuthenticatedRequest).userId || req.ip || "unknown",
  message: { error: "Too many requests. Please try again later." },
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
  keyGenerator: (req) => (req as AuthenticatedRequest).userId || req.ip || "unknown",
  message: { error: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
