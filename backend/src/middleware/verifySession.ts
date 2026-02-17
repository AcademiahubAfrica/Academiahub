import { promisify } from "util";
import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import { jwtDecrypt } from "jose";
import "../types";

const hkdf = promisify(crypto.hkdf);

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

  try {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
      throw new Error("NEXTAUTH_SECRET is not configured");
    }

    const encryptionKey = await getDerivedEncryptionKey(secret);

    const { payload } = await jwtDecrypt(token, encryptionKey, {
      clockTolerance: 15,
    });

    if (!payload.sub) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    req.userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}

/**
 * Standalone function for verifying a JWT token outside of Express middleware.
 * Used by the Socket.IO authentication handler.
 * Returns the userId if valid, null otherwise.
 */
export async function verifyToken(token: string): Promise<string | null> {
  try {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) return null;

    const encryptionKey = await getDerivedEncryptionKey(secret);

    const { payload } = await jwtDecrypt(token, encryptionKey, {
      clockTolerance: 15,
    });

    return payload.sub ?? null;
  } catch {
    return null;
  }
}
