import dotenv from "dotenv";
dotenv.config();

import * as Sentry from "@sentry/node";

/**
 * Sentry for the messaging service.
 *
 * Imported first by `server.ts`, before anything else, so the SDK is running
 * before there is anything for it to miss. `dotenv` is loaded here rather than
 * there because `SENTRY_DSN` has to exist by the time `init` reads it — the
 * compiler preserves the order of these two statements, so this works.
 *
 * Same DSN as the web app on purpose. One project, with `service` telling the
 * two apart, so that a failed login on the web and someone probing
 * conversations here are one search rather than two.
 */
Sentry.init({
  dsn: process.env.SENTRY_DSN,

  /* No DSN, no destination. Staying off keeps local development and any
     environment that has not been given the variable from erroring. */
  enabled: Boolean(process.env.SENTRY_DSN),

  environment: process.env.NODE_ENV,

  enableLogs: true,

  tracesSampleRate: 0,
});

export { Sentry };
