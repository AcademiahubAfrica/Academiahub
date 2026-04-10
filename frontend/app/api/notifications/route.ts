import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";

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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor") || undefined;
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));

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
