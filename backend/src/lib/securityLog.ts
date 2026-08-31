import type { IncomingHttpHeaders } from "http";
import * as Sentry from "@sentry/node";


// Security event log for the messaging service.

// Event names are a closed set so a query written today keeps working. 
export type SecurityEventName =
  | "authz.denied" // A REST request was refused by an auth or ownership check. 
  | "ws.auth.rejected" // A socket handshake was turned away. 
  | "ws.connection.limited" // A user hit the per-account socket limit. 
  | "internal.auth.failed" // Someone presented the wrong service-to-service secret. */
  | "ratelimit.exceeded" // A caller exceeded a rate limit. */
  | "request.failed"; // A request died with an unhandled error. */

export type SecurityOutcome = "success" | "failure";

export type SecurityRequestContext = {
  ip?: string;
  userAgent?: string;
  method?: string;
  path?: string;
};

export type SecurityLogEntry = {
  event: SecurityEventName;
  outcome: SecurityOutcome;
  userId?: string;
  request?: SecurityRequestContext;
  detail?: Record<string, unknown>;
};

const SENSITIVE_KEY = /pass|token|secret|code|otp|authorization|cookie|hash/i;

const MAX_DEPTH = 4;

function redact(value: unknown, depth = 0): unknown {
  if (depth >= MAX_DEPTH) return "[truncated]";
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map((v) => redact(v, depth + 1));

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, v]) => [
      key,
      SENSITIVE_KEY.test(key) ? "[redacted]" : redact(v, depth + 1),
    ]),
  );
}

/**
 * Pulls the client address and user agent out of a header bag.
 *
 * This service sits behind a proxy, and `trust proxy` is not configured, so
 * `req.ip` is the proxy's address rather than the caller's. The forwarded
 * header is the only place the real one appears. It is caller-supplied and so
 * forgeable — good enough for spotting patterns, not good enough to make an
 * access-control decision on.
 */
export function requestContext(
  headers: IncomingHttpHeaders | undefined,
  extra: { method?: string; path?: string } = {},
): SecurityRequestContext {
  const get = (name: string): string | undefined => {
    const raw = headers?.[name];
    if (typeof raw === "string") return raw;
    if (Array.isArray(raw) && typeof raw[0] === "string") return raw[0];
    return undefined;
  };

  const forwarded = get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || get("x-real-ip");

  return {
    ip: ip || undefined,
    userAgent: get("user-agent"),
    method: extra.method,
    path: extra.path,
  };
}

/**
 * Records one security event.
 *
 * Never throws. This sits in authentication and authorisation paths, and no
 * logging problem is worth failing — or wrongly allowing — a request over.
 */
export function securityLog(entry: SecurityLogEntry): void {
  let attributes: Record<string, unknown>;

  try {
    attributes = {
      service: "backend",
      outcome: entry.outcome,
      userId: entry.userId,
      ip: entry.request?.ip,
      userAgent: entry.request?.userAgent,
      method: entry.request?.method,
      path: entry.request?.path,
    };

    /* Flattened rather than nested, so each one is a field you can search on
       instead of a blob you have to read. */
    if (entry.detail) {
      const safe = redact(entry.detail) as Record<string, unknown>;
      for (const [key, value] of Object.entries(safe)) {
        attributes[`detail.${key}`] = value;
      }
    }
  } catch {
    // Nothing sensible can be said about an entry we could not even assemble.
    return;
  }

  // Destination 1: the process output
  try {
    console.log(
      JSON.stringify({
        type: "security",
        ts: new Date().toISOString(),
        event: entry.event,
        ...attributes,
      }),
    );
  } catch {
    // Ignored on purpose; destination 2 may still work.
  }

  // Destination 2: Sentry
  try {
    // Failures are the ones worth a second look, so they land a level higher.
    const level = entry.outcome === "failure" ? "warn" : "info";
    Sentry.logger[level](entry.event, attributes);
  } catch (err) {
    /* Deliberately noisy. If this sink breaks — a bad upgrade, an SDK that
       never started — the events simply stop arriving, and a silent catch here
       would mean nothing ever says why. */
    try {
      console.error("securityLog: could not reach Sentry", err);
    } catch {
      // Out of options; the event is already on stdout above.
    }
  }
}
