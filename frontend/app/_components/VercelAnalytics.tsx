"use client";

import { Analytics } from "@vercel/analytics/next";
import { redactUrl } from "@/lib/redactUrl";

/**
 * Vercel Analytics with sensitive query values removed from every event.
 *
 * A client wrapper because `beforeSend` is a function, and the root layout is a
 * Server Component, which cannot pass functions to client components.
 */
export default function VercelAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => ({
        ...event,
        url: redactUrl(event.url, window.location.origin),
      })}
    />
  );
}
