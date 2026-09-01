/**
 * Reading query parameters without turning bad input into a server error.
 *
 * The pattern these replace looked safe but was not:
 *
 *   Math.max(1, parseInt(searchParams.get("page") || "1"))
 *
 * `parseInt("abc")` is `NaN`, and `Math.max(1, NaN)` is `NaN` — comparisons
 * against NaN are all false, so the clamp passes it straight through. `NaN`
 * then reaches Prisma as `skip`, which throws, which the outer catch turns into
 * a 500. Requesting page "abc" produced an internal error rather than a page.
 *
 * Two reasons that matters. A 500 tells a caller they found something the
 * server did not expect, which is a lead worth pulling on. And it costs a
 * database round trip and an exception to say what a bounds check could have
 * said for nothing.
 */

/**
 * A positive integer within bounds, or the fallback.
 *
 * Out-of-range and unparseable values fall back rather than being rejected:
 * these are pagination hints, and a caller asking for page -3 wants the first
 * page, not an error page.
 */
export function positiveInt(
  raw: string | null,
  fallback: number,
  max: number,
): number {
  const n = Number.parseInt(raw ?? "", 10);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(n, max);
}

/**
 * MongoDB ObjectIds are 24 hex characters. Anything else cannot identify a row,
 * and handing it to Prisma raises rather than returning nothing — so cursors
 * and path parameters are checked before they get that far.
 */
const OBJECT_ID = /^[a-f\d]{24}$/i;

export function isObjectId(value: string | null | undefined): value is string {
  return typeof value === "string" && OBJECT_ID.test(value);
}

/** A valid cursor, or `undefined` — never a value that would reach the driver. */
export function objectIdOrUndefined(
  raw: string | null | undefined,
): string | undefined {
  return isObjectId(raw) ? raw : undefined;
}
