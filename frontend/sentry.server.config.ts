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
Sentry.init({
  dsn: process.env.SENTRY_DSN,

  /* No DSN, no destination. Staying off keeps local development and any
     environment that has not been given the variable from erroring. */
  enabled: Boolean(process.env.SENTRY_DSN),

  environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,

  enableLogs: true,

  /* Performance tracing is a separate product drawing on a separate quota, and
     nothing here needs it. Raise it if request timing ever becomes interesting;
     logs do not depend on it. Unhandled errors are still captured. */
  tracesSampleRate: 0,
});

/* ---------------------------------------------------------------------------
 * On what gets collected — read before changing anything above.
 *
 * Neither `sendDefaultPii` nor `dataCollection` is set, and that is the whole
 * point. Left alone, the SDK resolves to its cautious profile: request bodies
 * are not collected at all, and cookie and authorization headers are filtered.
 *
 * The trap is that setting `dataCollection` *at all* — even one field, even an
 * empty object — switches the baseline from the cautious profile to Sentry's
 * permissive defaults, and anything left unspecified then comes from those.
 * Request-body collection is one of them. Login requests carry passwords in the
 * body, so "tightening" this by adding `dataCollection: { userInfo: false }`
 * would start shipping passwords to a third party. If a field ever genuinely
 * needs setting, every other field has to be set alongside it.
 *
 * See `resolveDataCollectionOptions` in @sentry/core for the exact behaviour.
 *
 * The IP address and email address on our own security events are separate
 * from all of the above: we attach those on purpose, because an authentication
 * log that cannot say which account or where from answers no useful question.
 * They are personal data, which is a privacy-policy matter, not a bug.
 * ------------------------------------------------------------------------- */
