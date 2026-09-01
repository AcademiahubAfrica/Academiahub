import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";
import { isBannerKey } from "@/lib/profileBanner";
import { denied } from "@/lib/logging/denied";

/**
 * PATCH /api/user/banner
 * Set the signed-in user's profile banner. Send `null` to clear the selection
 * and fall back to the default banner.
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return denied({
        route: "/api/user/banner",
        reason: "no_session",
      });
    }

    const { bannerKey } = (await request.json()) as { bannerKey: unknown };

    if (bannerKey !== null && !isBannerKey(bannerKey)) {
      return NextResponse.json({ error: "Invalid banner" }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: { bannerKey },
      select: { bannerKey: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    /* The generic message to the caller is right; discarding the cause is not.
       Without this a database outage and a schema mismatch look identical, and
       neither is visible to anyone. */
    console.error("Error updating banner:", error);
    return NextResponse.json(
      { error: "Failed to update banner" },
      { status: 500 },
    );
  }
}
