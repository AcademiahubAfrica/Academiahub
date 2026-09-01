/**
 * Deciding whether a session token is still good.
 *
 * Sessions here are self-contained tokens with no server-side record, so there
 * is nothing to delete when a password changes. Instead the account carries a
 * version, the token carries the version it was issued against, and a mismatch
 * retires the token.
 *
 * Kept apart from the NextAuth callback so the comparison can be exercised
 * without a provider, a token or a database. The `null` and `undefined` cases
 * are the whole risk: reading either as "no match" would sign out every user on
 * deploy, and reading a mismatch as a match would defeat the feature.
 */

/**
 * How long a retired session may keep working.
 *
 * The callback this serves runs on every session read, so checking each time
 * would mean a database round trip per request. Five minutes trades a short
 * window for a query rate that tracks users rather than traffic.
 */
export const SESSION_CHECK_INTERVAL_SECONDS = 5 * 60;

// True when the token has gone long enough without being verified. 
export function isCheckDue(
  lastCheckedAt: number | undefined,
  now: number,
  interval: number = SESSION_CHECK_INTERVAL_SECONDS,
): boolean {
  return now - (lastCheckedAt ?? 0) > interval;
}

/**
 * True when the account has moved on from the version this token was issued
 * against.
 *
 * Absent means zero on both sides. The column is nullable because MongoDB does
 * not backfill a new field, so every account predating it reads as `null`, and
 * tokens issued before this existed carry no version at all. Both must count as
 * version zero, or deploying this would log out everyone at once.
 */
export function isSessionRetired(
  tokenVersion: number | undefined,
  storedVersion: number | null | undefined,
): boolean {
  return (storedVersion ?? 0) !== (tokenVersion ?? 0);
}
