/**
 * Reading request input without turning bad values into server errors.
 *
 * A value that is not a valid ObjectId makes Prisma raise rather than return
 * nothing, and the raise becomes a 500. That tells a caller they found
 * something unexpected, and costs a round trip to say what a format check says
 * for free.
 *
 * Mirrors `frontend/lib/queryParams.ts`. Kept separate because the two
 * workspaces build and deploy independently.
 */

// MongoDB ObjectIds are 24 hex characters. 
const OBJECT_ID = /^[a-f\d]{24}$/i;

export function isObjectId(value: unknown): value is string {
  return typeof value === "string" && OBJECT_ID.test(value);
}

// A usable cursor, or undefined. Never a value that would reach the driver. 
export function objectIdOrUndefined(value: unknown): string | undefined {
  return isObjectId(value) ? value : undefined;
}

/**
 * A positive integer within bounds, or the fallback. Out-of-range values fall
 * back rather than being rejected: these are pagination hints, and a caller
 * asking for page -3 wants the first page, not an error.
 */
export function positiveInt(
  raw: unknown,
  fallback: number,
  max: number
): number {
  const n = Number.parseInt(typeof raw === "string" ? raw : "", 10);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(n, max);
}
