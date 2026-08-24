import { promisify } from "util";
import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import { jwtDecrypt, jwtVerify } from "jose";
import "../types";

const hkdf = promisify(crypto.hkdf);

/**
 * Audience on the tokens this service accepts. Issued by
 * `frontend/app/api/auth/ws-token/route.ts`; the constants here and there must
 * stay in step.
 */
const WS_TOKEN_AUDIENCE = "academiahub-ws";

/** Separates the signing key from the one NextAuth derives for sessions. */
const WS_TOKEN_HKDF_INFO = "AcademiaHub WebSocket Token";

/**
 * Derives the encryption key from NEXTAUTH_SECRET using HKDF,
 * matching NextAuth v4's internal key derivation.
 */
async function getDerivedEncryptionKey(secret: string): Promise<Uint8Array> {
  const derivedKey = await hkdf(
    "sha256",
    secret,
    "",
    "NextAuth.js Generated Encryption Key",
    32
  );
  return new Uint8Array(derivedKey);
}

async function getWsSigningKey(secret: string): Promise<Uint8Array> {
  const derivedKey = await hkdf("sha256", secret, "", WS_TOKEN_HKDF_INFO, 32);
  return new Uint8Array(derivedKey);
}

/**
 * Resolves a bearer token to a user id, or null.
 *
 * Two shapes are accepted for now. The first is the intended one: a short-lived
 * HS256 token scoped to this service. The second is a NextAuth session JWE,
 * which is what the frontend used to send.
 *
 * TODO: delete the legacy branch once the frontend that issues `ws-token` has
 * fully rolled out. It is only here so the two services can deploy in any
 * order without messaging going down in between.
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
    if (payload.sub) return payload.sub;
  } catch {
    // Falls through to the legacy check below.
  }

  try {
    const { payload } = await jwtDecrypt(
      token,
      await getDerivedEncryptionKey(secret),
      { clockTolerance: 15 }
    );
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

/**
 * Express middleware that verifies NextAuth v4 encrypted JWTs (JWE).
 * Extracts userId from the decrypted payload and attaches it to req.userId.
 */
export async function verifySession(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.slice(7);

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const userId = await resolveUserId(token);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  req.userId = userId;
  next();
}

/**
 * Standalone function for verifying a JWT token outside of Express middleware.
 * Used by the Socket.IO authentication handler.
 * Returns the userId if valid, null otherwise.
 */
export async function verifyToken(token: string): Promise<string | null> {
  return resolveUserId(token);
}
