"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import type LogRocketType from "logrocket";
import {
  redactUrl,
  sanitizeRequest,
  sanitizeResponse,
} from "@/lib/logRocketPrivacy";

let logRocketPromise: Promise<typeof LogRocketType> | null = null;

function loadLogRocket() {
  if (process.env.NODE_ENV !== "production") return null;
  if (!logRocketPromise) {
    logRocketPromise = import("logrocket").then((m) => {
      const origin = window.location.origin;
      m.default.init("jgsvfu/academiahub", {
        shouldCaptureIP: false,
        /** Typed values are never recorded. Messages are excluded separately
           with `data-private` on the inbox.*/
        dom: { inputSanitizer: true },
        browser: { urlSanitizer: (url) => redactUrl(url, origin) },
        network: {
          requestSanitizer: (request) => sanitizeRequest(request, origin),
          responseSanitizer: (response) => sanitizeResponse(response, origin),
        },
      });
      return m.default;
    });
  }
  return logRocketPromise;
}

export default function LogRocketInit() {
  const identified = useRef<string | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    void loadLogRocket();
  }, []);

  useEffect(() => {
    if (!userId || identified.current === userId) return;
    loadLogRocket()?.then((LogRocket) => {
      /* The opaque id is enough to find a session internally. Name and email
         are not sent. */
      LogRocket.identify(userId);
      identified.current = userId;
    });
  }, [userId]);

  return null;
}
