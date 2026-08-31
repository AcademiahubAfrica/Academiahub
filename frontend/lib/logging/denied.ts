import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { requestContext, securityLog } from "./securityLog";

/**
 * Refuses a request and records that it was refused.
 *
 * Route handlers use this in place of building the 401 or 403 by hand, so that
 * a refusal cannot be added anywhere without also being logged — the previous
 * arrangement, where the two were separate steps, is how thirty-odd refusals
 * ended up going unrecorded.
 *
 * The context comes from `headers()` rather than a `Request` parameter, because
 * several handlers do not take one. Every route that refuses has already read
 * the session by this point, so nothing here changes whether a route is static.
 */

/** Default bodies, matching what each status returned before this existed. */
const DEFAULT_MESSAGE: Record<number, string> = {
  401: "Unauthorized",
  403: "Forbidden",
};

export async function denied(params: {
  /**
   * The route pattern that refused, e.g. `/api/documents/[id]`. Recorded as
   * `path`, matching the field the messaging service uses.
   *
   * Passed in rather than discovered: a route handler has no way to ask what
   * path it is serving unless it accepts a `Request`, and several here do not.
   * The pattern is also the more useful of the two — it groups, where a
   * concrete path with an id baked in does not.
   */
  route: string;
  reason: string; // Short, stable, for us — never sent to the caller. 
  status?: 401 | 403;
  message?: string; // Overrides the default body where a route already said something else. 
  userId?: string; // Present on an ownership refusal; absent when there was no session. 
  detail?: Record<string, unknown>; // What was being reached for — an id, usually. 
}): Promise<NextResponse> {
  const { route, reason, status = 401, message, userId, detail } = params;

  /* `headers()` can throw if called outside a request scope. A logging problem
     must not turn a 401 into a 500, so the refusal is built either way. */
  try {
    securityLog({
      event: "authz.denied",
      outcome: "failure",
      actor: { userId },
      request: { ...requestContext(await headers()), path: route },
      detail: { reason, status, ...detail },
    });
  } catch {
    // Refusing the request is the part that matters; carry on and refuse it.
  }

  return NextResponse.json(
    { error: message ?? DEFAULT_MESSAGE[status] },
    { status },
  );
}
