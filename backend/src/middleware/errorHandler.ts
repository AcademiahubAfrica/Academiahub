import { Request, Response, NextFunction } from "express";

/**
 * Global error handler.
 * In production: generic error message, no stack traces.
 * In development: full error details for debugging.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("Unhandled error:", err);

  if (process.env.NODE_ENV === "production") {
    res.status(500).json({ error: "Something went wrong" });
  } else {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
}
