import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";
import { denied } from "@/lib/logging/denied";
import { objectIdOrUndefined, positiveInt } from "@/lib/queryParams";

/**
 * GET /api/notifications
 * Get user's notifications (newest first, cursor-based pagination).
 *
 * Query params:
 *   cursor — id of the last notification from the previous page
 *   limit  — number of items to fetch (default 20, max 50)
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return denied({
        route: "/api/notifications",
        reason: "no_session",
      });
    }

    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    /* A cursor that is not an ObjectId makes Prisma raise rather than return
       nothing, so a malformed one is dropped and the caller gets the first
       page instead of a 500. */
    const cursor = objectIdOrUndefined(searchParams.get("cursor"));
    const limit = positiveInt(searchParams.get("limit"), 20, 50);

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit + 1,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
    });

    let nextCursor: string | null = null;
    if (notifications.length > limit) {
      const lastItem = notifications.pop()!;
      nextCursor = lastItem.id;
    }

    return NextResponse.json({ notifications, nextCursor });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
