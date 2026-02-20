import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";

/**
 * GET /api/analytics
 * Get user's stats + monthly download chart data.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const [uploadCount, documents, savesReceived, downloadRecords] =
      await Promise.all([
        prisma.document.count({ where: { authorId: userId } }),
        prisma.document.findMany({
          where: { authorId: userId },
          select: { downloads: true, likes: true },
        }),
        prisma.save.count({
          where: { document: { authorId: userId } },
        }),
        prisma.downloadRecord.findMany({
          where: { document: { authorId: userId } },
          select: { createdAt: true },
          orderBy: { createdAt: "asc" },
        }),
      ]);

    const totalDownloads = documents.reduce((sum, doc) => sum + doc.downloads, 0);
    const totalLikes = documents.reduce((sum, doc) => sum + doc.likes, 0);

    // Aggregate downloads by month (last 12 months)
    const now = new Date();
    const monthlyDownloads: { month: string; count: number }[] = [];

    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
      monthlyDownloads.push({ month: monthLabel, count: 0 });
    }

    for (const record of downloadRecords) {
      const recordDate = new Date(record.createdAt);
      const monthLabel = recordDate.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
      const entry = monthlyDownloads.find((m) => m.month === monthLabel);
      if (entry) {
        entry.count++;
      }
    }

    return NextResponse.json({
      stats: {
        uploads: uploadCount,
        downloads: totalDownloads,
        likes: totalLikes,
        saves: savesReceived,
      },
      monthlyDownloads,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
