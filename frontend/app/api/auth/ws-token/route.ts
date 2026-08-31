import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createWsToken, WS_TOKEN_TTL_SECONDS } from "@/lib/auth/wsToken";
import { denied } from "@/lib/logging/denied";

/**
 * GET /api/auth/ws-token
 *
 * Issues a short-lived token for the messaging backend. Replaces the earlier
 * `/api/auth/token`, which returned the NextAuth session token itself — any
 * script on the page could read that and act as the user for the life of the
 * session.
 */
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return denied({
      route: "/api/auth/ws-token",
      reason: "no_session",
      message: "Not authenticated",
    });
  }

  const token = await createWsToken(session.user.id);

  return NextResponse.json(
    { token, expiresIn: WS_TOKEN_TTL_SECONDS },
    /* Short-lived and per-user: nothing between here and the browser should
       hold on to it. */
    { headers: { "Cache-Control": "no-store" } },
  );
}
