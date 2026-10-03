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

/* Header and query-parameter names that identify a person or their address.
   Matched as substrings, on top of the SDK's own filter for keys, tokens and
   cookies, which cannot be turned off. */
const PII_KEYS = ["forwarded", "-ip", "remote-", "via", "-user"];

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  /* No DSN, no destination. Staying off keeps local development and any
     environment that has not been given the variable from erroring. */
  enabled: Boolean(process.env.SENTRY_DSN),

  environment: process.env.NODE_ENV,

  tracesSampleRate: 0,

  /* Every field is set on purpose: since v11 anything left out is collected,
     request bodies and cookies included. Kept identical to the web app's
     `sentry.server.config.ts`, which explains the reasoning. */
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpHeaders: {
      request: { deny: PII_KEYS },
      response: { deny: PII_KEYS },
    },
    httpBodies: [],
    urlQueryParams: { deny: PII_KEYS },
    graphQL: { document: false, variables: false },
    genAI: { inputs: false, outputs: false },
    databaseQueryData: false,
    queues: false,
    stackFrameVariables: false,
    frameContextLines: 7,
  },
});

export { Sentry };
