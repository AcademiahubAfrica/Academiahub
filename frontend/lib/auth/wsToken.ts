import crypto from "crypto";
import { promisify } from "util";

const hkdf = promisify(crypto.hkdf);

/**
 * Mints the short-lived token the realtime backend accepts.
 *
 * This exists so the browser never holds the NextAuth session token. The
 * session cookie is HttpOnly precisely so that script on the page cannot read
 * it; handing the same value back over `fetch` would undo that. What the
 * browser gets instead carries a user id and nothing else, is only accepted by
 * the messaging backend, and expires in minutes.
 *
 * The backend half lives in `backend/src/middleware/verifySession.ts`. The two
 * constants below and the derivation must stay in step with it.
 */

/** Rejected by anything that is not the messaging backend. */
export const WS_TOKEN_AUDIENCE = "academiahub-ws";

/**
 * Five minutes. The clients refetch per request and on every reconnect, so a
 * short window costs nothing and puts a hard floor under how long a leaked
 * token stays useful.
 */
export const WS_TOKEN_TTL_SECONDS = 5 * 60;

/**
 * The `info` string is what separates this key from the one NextAuth derives
 * for session encryption ("NextAuth.js Generated Encryption Key"). Same secret,
 * independent keys — a token signed here can never be mistaken for a session,
 * and recovering one key does not yield the other.
 */
const HKDF_INFO = "AcademiaHub WebSocket Token";

let cachedKey: Uint8Array | null = null;

async function getSigningKey(): Promise<Uint8Array> {
  if (cachedKey) return cachedKey;

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not set; cannot sign a WebSocket token");
  }

  const derived = await hkdf("sha256", secret, "", HKDF_INFO, 32);
  cachedKey = new Uint8Array(derived);
  return cachedKey;
}

function encodeSegment(value: object): string {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

/** Signs an HS256 JWT scoped to the messaging backend. */
export async function createWsToken(userId: string): Promise<string> {
  const key = await getSigningKey();
  const now = Math.floor(Date.now() / 1000);

  const signingInput =
    encodeSegment({ alg: "HS256", typ: "JWT" }) +
    "." +
    encodeSegment({
      sub: userId,
      aud: WS_TOKEN_AUDIENCE,
      iat: now,
      exp: now + WS_TOKEN_TTL_SECONDS,
    });

  const signature = crypto
    .createHmac("sha256", key)
    .update(signingInput)
    .digest("base64url");

  return `${signingInput}.${signature}`;
}
