import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";

/**
 * GET /api/documents/:id
 * Get single document with author info + interaction status for current user.
 */
export async function GET(
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
      include: {
        author: { select: { id: true, name: true, image: true } },
      },
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const [liked, saved] = await Promise.all([
      prisma.like.findUnique({
        where: { userId_documentId: { userId, documentId } },
      }),
      prisma.save.findUnique({
        where: { userId_documentId: { userId, documentId } },
      }),
    ]);

    return NextResponse.json({
      ...document,
      isLiked: !!liked,
      isSaved: !!saved,
    });
  } catch (error) {
    console.error("Error fetching document:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
