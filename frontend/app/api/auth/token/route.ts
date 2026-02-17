import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Returns the raw NextAuth session token (encrypted JWE) for the
 * authenticated user. The backend decrypts this server-side.
 */
export async function GET() {
  const cookieStore = await cookies();

  // NextAuth v4 uses different cookie names in dev vs production
  const token =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({ token });
}