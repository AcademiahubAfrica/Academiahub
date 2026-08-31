import { promisify } from "util";
import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";
import "../types";
import { requestContext, securityLog } from "../lib/securityLog";

const hkdf = promisify(crypto.hkdf);

/**
 * Audience on the tokens this service accepts. Issued by
 * `frontend/app/api/auth/ws-token/route.ts`; the constants here and there must
 * stay in step.
 */
const WS_TOKEN_AUDIENCE = "academiahub-ws";

/** Separates the signing key from the one NextAuth derives for sessions. */
const WS_TOKEN_HKDF_INFO = "AcademiaHub WebSocket Token";

async function getWsSigningKey(secret: string): Promise<Uint8Array> {
  const derivedKey = await hkdf("sha256", secret, "", WS_TOKEN_HKDF_INFO, 32);
  return new Uint8Array(derivedKey);
}

/**
 * Resolves a bearer token to a user id, or null.
 *
 * Only the scoped token is accepted. `algorithms` and `audience` are both
 * pinned: the first refuses an unsigned `alg: "none"` forgery, the second
 * refuses anything minted for a different consumer.
 */
async function resolveUserId(token: string): Promise<string | null> {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) return null;

  try {
    const { payload } = await jwtVerify(token, await getWsSigningKey(secret), {
      audience: WS_TOKEN_AUDIENCE,
      algorithms: ["HS256"],
      clockTolerance: 15,
    });
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

/**
 * Express middleware that verifies the scoped token from the `Authorization`
 * header and attaches its subject to req.userId.
 */
export async function verifySession(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  /* The reason is recorded but never returned: the caller keeps getting a bare
     "Unauthorized" either way, so nothing here tells an attacker which of their
     guesses was closer. */
  const refuse = (reason: string): void => {
    securityLog({
      event: "authz.denied",
      outcome: "failure",
      request: requestContext(req.headers, {
        method: req.method,
        path: req.originalUrl,
      }),
      detail: { reason },
    });
    res.status(401).json({ error: "Unauthorized" });
  };

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    refuse(authHeader ? "malformed_authorization_header" : "no_authorization_header");
    return;
  }

  const token = authHeader.slice(7);

  if (!token) {
    refuse("empty_token");
    return;
  }

  const userId = await resolveUserId(token);

  if (!userId) {
    /* Covers every way jwtVerify can say no: expired, wrong audience, wrong
       algorithm, bad signature. Worth watching as one number — these tokens
       last five minutes, so a steady trickle is normal and a spike is not. */
    refuse("invalid_token");
    return;
  }

  req.userId = userId;
  next();
}

/**
 * Standalone verification for use outside Express — the Socket.IO handshake
 * reads the token from `socket.handshake.auth` rather than a header.
 * Returns the userId if valid, null otherwise.
 */
export async function verifyToken(token: string): Promise<string | null> {
  return resolveUserId(token);
}
