/**
 * Removing credentials and personal data from URLs before a third party sees
 * them.
 *
 * A password reset link carries a working token in its query string, and the
 * verification page carries an email address. Session replay, Google Analytics
 * and Vercel Analytics all record page URLs, so every one of them needs the same
 * treatment. One list, so they cannot drift apart.
 *
 * No imports: this runs in client components and is interpolated into an inline
 * script.
 */
export const SENSITIVE_QUERY_PARAMS = ["token", "email", "code"];

export function redactUrl(url: string, origin = "http://localhost"): string {
  try {
    const parsed = new URL(url, origin);
    for (const name of SENSITIVE_QUERY_PARAMS) {
      if (parsed.searchParams.has(name)) {
        parsed.searchParams.set(name, "redacted");
      }
    }
    return parsed.toString();
  } catch {
    // Unparseable: drop the query string rather than risk sending it.
    return url.split("?")[0];
  }
}
