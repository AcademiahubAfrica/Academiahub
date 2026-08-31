import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";
import { denied } from "@/lib/logging/denied";

/**
 * GET /api/notifications/unread-count
 * Get count of unread notifications.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return denied({
        route: "/api/notifications/unread-count",
        reason: "no_session",
      });
    }

    const count = await prisma.notification.count({
      where: { userId: session.user.id, read: false },
    });

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching unread count:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
