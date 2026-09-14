/**
 * What session replay is allowed to record.
 *
 * Kept free of heavy imports so the client component can use it without
 * pulling anything else into the bundle, and so the rules can be tested alone.
 */
import { redactUrl } from "@/lib/redactUrl";

export { redactUrl };

/* Headers that authenticate the request they sit on. */
const SENSITIVE_HEADERS = new Set(["authorization", "cookie", "set-cookie"]);

type Headers = { [key: string]: string | null | undefined };

export function withoutSensitiveHeaders(headers: Headers): Headers {
  return Object.fromEntries(
    Object.entries(headers).filter(
      ([name]) => !SENSITIVE_HEADERS.has(name.toLowerCase()),
    ),
  );
}

type NetworkRequest = { url: string; headers: Headers; body?: string };
type NetworkResponse = { url?: string; headers: Headers; body?: string };

/**
 * Bodies are dropped in both directions. Requests carry passwords on sign-in,
 * sign-up, reset and change; responses carry messages and short-lived tokens.
 * Method, URL and status survive, which is what is needed to see which call
 * failed.
 */
export function sanitizeRequest<T extends NetworkRequest>(
  request: T,
  origin?: string,
) {
  return {
    ...request,
    url: redactUrl(request.url, origin),
    headers: withoutSensitiveHeaders(request.headers),
    body: null,
  };
}

export function sanitizeResponse<T extends NetworkResponse>(
  response: T,
  origin?: string,
) {
  return {
    ...response,
    url: response.url ? redactUrl(response.url, origin) : response.url,
    headers: withoutSensitiveHeaders(response.headers),
    body: null,
  };
}
