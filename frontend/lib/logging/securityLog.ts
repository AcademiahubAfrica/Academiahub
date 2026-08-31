import * as Sentry from "@sentry/nextjs";

/**
 * Security event log.
 *
 * Every security-relevant thing that happens to an account goes through here,
 * and out to two places: Sentry, which keeps it for thirty days, and the
 * process output, which the host keeps for about an hour. The second is not
 * redundant — it is what remains when Sentry is unreachable or out of quota.
 *
 * Call sites describe *what happened* and nothing else. Where it is written,
 * how it is shaped, and what gets stripped are all decided here, so changing
 * any of that never means touching an authentication path.
 *
 * What belongs here is a question about the *account*, answerable months from
 * now: who tried to get in, from where, and did it work. What does not belong
 * here is anything that would let a reader of the logs get in themselves.
 */

/** Event names are a closed set so a query written today keeps working. */
export type SecurityEventName =
  | "auth.login.success"
  | "auth.login.failure"
  | "auth.oauth.refused"
  | "auth.oauth.account_reclaimed"
  | "auth.email.verification.failure"
  | "auth.email.verification.locked"
  | "auth.password.reset.requested"
  | "auth.password.reset.completed"
  | "auth.password.changed";

export type SecurityOutcome = "success" | "failure";

export type SecurityActor = {
  userId?: string;
  /* The address that was *attempted*, which on a failed login is the only
     identifier there is — no account may exist behind it. It is what makes a
     "same address, forty attempts, nine countries" query possible, so it is
     worth the PII cost; see the retention note in the module docs above. */
  email?: string | null;
};

export type SecurityRequestContext = {
  ip?: string;
  userAgent?: string;
};

export type SecurityLogEntry = {
  event: SecurityEventName;
  outcome: SecurityOutcome;
  actor?: SecurityActor;
  request?: SecurityRequestContext;
  detail?: Record<string, unknown>;
};

/* Belt and braces. Call sites are not supposed to pass any of these, but a
   security log is exactly the wrong place to find out that one did. Matching is
   on the key name, case-insensitive, at any depth. */
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
 * Header bags arrive in two shapes: a `Headers` from a route handler, and a
 * plain object from NextAuth's `authorize`. Both are read the same way here.
 */
export function requestContext(
  headers: Headers | Record<string, unknown> | undefined,
): SecurityRequestContext {
  if (!headers) return {};

  const get = (name: string): string | undefined => {
    if (headers instanceof Headers) return headers.get(name) ?? undefined;
    const raw = (headers as Record<string, unknown>)[name];
    if (typeof raw === "string") return raw;
    if (Array.isArray(raw) && typeof raw[0] === "string") return raw[0];
    return undefined;
  };

  /* Behind a proxy the socket address is the proxy, so the client is the first
     entry of x-forwarded-for. It is caller-supplied and therefore forgeable —
     fine for spotting patterns, not fine as an access-control input. */
  const forwarded = get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || get("x-real-ip");

  return {
    ip: ip || undefined,
    userAgent: get("user-agent"),
  };
}

/**
 * Records one security event.
 *
 * Never throws: this sits inside sign-in and password paths, and no logging
 * problem is worth failing an authentication over. The two destinations are
 * attempted independently, so one being broken does not cost you the other.
 */
export function securityLog(entry: SecurityLogEntry): void {
  let attributes: Record<string, unknown>;

  try {
    attributes = {
      outcome: entry.outcome,
      userId: entry.actor?.userId,
      email: entry.actor?.email ?? undefined,
      ip: entry.request?.ip,
      userAgent: entry.request?.userAgent,
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
    return;
  }

  // Destination 1: the process output.
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

  // Destination 2: Sentry, which keeps it for thirty days. 
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
