import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";

/**
 * GET /api/profile/:userId
 * Get another user's profile with computed stats.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId } = await params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        image: true,
        Profile: {
          take: 1,
          select: { bio: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Compute stats
    const [uploadCount, documents, savesReceived] = await Promise.all([
      prisma.document.count({ where: { authorId: userId } }),
      prisma.document.findMany({
        where: { authorId: userId },
        select: { downloads: true, likes: true },
      }),
      prisma.save.count({
        where: { document: { authorId: userId } },
      }),
    ]);

    const totalDownloads = documents.reduce((sum, doc) => sum + doc.downloads, 0);
    const totalLikes = documents.reduce((sum, doc) => sum + doc.likes, 0);

    return NextResponse.json({
      id: user.id,
      name: user.name,
      image: user.image,
      bio: user.Profile[0]?.bio ?? null,
      stats: {
        uploads: uploadCount,
        downloads: totalDownloads,
        likes: totalLikes,
        saves: savesReceived,
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
