import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";

/**
 * POST /api/documents/:id/download
 * Record a download (increments counter + creates DownloadRecord).
 */
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: documentId } = await params;
    const userId = session.user.id;

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      select: { id: true },
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.downloadRecord.create({ data: { userId, documentId } }),
      prisma.document.update({
        where: { id: documentId },
        data: { downloads: { increment: 1 } },
      }),
    ]);

    return NextResponse.json({ message: "Download recorded successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error recording download:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
