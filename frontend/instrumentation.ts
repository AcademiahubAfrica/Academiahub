import * as Sentry from "@sentry/nextjs";

/**
 * Next.js calls this once, before anything else runs. It is the only place the
 * Sentry SDK can be started early enough to see what happens afterwards.
 */
export async function register() {
  /* Node only. The edge runtime would need its own config file, which does not
     exist on purpose — every route that logs security events runs on Node. */
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
}

/** Reports errors thrown while rendering or handling a request. */
export const onRequestError = Sentry.captureRequestError;
