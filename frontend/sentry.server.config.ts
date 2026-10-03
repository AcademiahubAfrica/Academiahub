import * as Sentry from "@sentry/nextjs";

/**
 * Sentry, server side only.
 *
 * This exists so security events outlive the host's own log window, which is
 * about an hour. There is deliberately no `instrumentation-client.ts` and no
 * `sentry.edge.config.ts`: the browser half of this SDK would ship extra
 * JavaScript to every visitor, add a second session recorder alongside
 * LogRocket, and need a new origin allowed in the Content-Security-Policy. None
 * of that is wanted here.
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

  environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,

  /* Performance tracing is a separate product drawing on a separate quota, and
     nothing here needs it. Raise it if request timing ever becomes interesting;
     logs do not depend on it. Unhandled errors are still captured. */
  tracesSampleRate: 0,

  /* Every field is set on purpose. See the note below before removing one. */
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

/* ---------------------------------------------------------------------------
 * On what gets collected — read before changing anything above.
 *
 * Since v11 the SDK collects generously unless told otherwise: any field left
 * out of `dataCollection` falls back to a default that sends it. That includes
 * request bodies, cookies, and database query values. Login requests carry
 * passwords in the body, so a missing `httpBodies: []` would start shipping
 * passwords to a third party.
 *
 * So every field is spelled out above, and the result is the cautious profile
 * v10 gave for free: no request bodies, no cookies, no user details inferred
 * from the request, and headers minus anything naming a person or an address.
 * If a field is ever removed, or Sentry adds a new one in a later version, the
 * permissive default applies to it. Check the list against `DataCollection`
 * in @sentry/core on every major upgrade.
 *
 * See `resolveDataCollectionOptions` in @sentry/core for the exact behaviour.
 *
 * The IP address and email address on our own security events are separate
 * from all of the above: we attach those on purpose, because an authentication
 * log that cannot say which account or where from answers no useful question.
 * They are personal data, which is a privacy-policy matter, not a bug.
 * ------------------------------------------------------------------------- */
