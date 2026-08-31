import { Request, Response, NextFunction } from "express";
import "../types";
import { requestContext, securityLog } from "../lib/securityLog";

/**
 * Global error handler.
 * In production: generic error message, no stack traces.
 * In development: full error details for debugging.
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  securityLog({
    event: "request.failed",
    outcome: "failure",
    userId: req.userId,
    request: requestContext(req.headers, {
      method: req.method,
      path: req.originalUrl,
    }),
    detail: { name: err.name, message: err.message },
  });

  /* The stack, and only the stack. This used to log `err` whole, which is how
     request values end up somewhere nobody thought was sensitive — several
     libraries hang the offending input off the error object itself (Prisma's
     `meta` being the one to watch). Name and message go to the line above; the
     rest of the object is not worth the risk of printing blind. */
  if (err.stack) {
    console.error(err.stack);
  }

  if (process.env.NODE_ENV === "production") {
    res.status(500).json({ error: "Something went wrong" });
  } else {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
}
