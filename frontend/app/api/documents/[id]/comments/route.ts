import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";

/**
 * GET /api/documents/:id/comments
 * Get comments for a document (paginated).
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: documentId } = await params;
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: { documentId },
        include: {
          user: { select: { id: true, name: true, image: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.comment.count({ where: { documentId } }),
    ]);

    return NextResponse.json({
      comments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

/**
 * POST /api/documents/:id/comments
 * Add comment to a document.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: documentId } = await params;
    const userId = session.user.id;
    const { content } = await request.json();

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    if (content.trim().length > 2000) {
      return NextResponse.json(
        { error: "Comment must be 2000 characters or less" },
        { status: 400 }
      );
    }

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      select: { id: true, authorId: true },
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        userId,
        documentId,
      },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
    });

    // Notify document author
    if (document.authorId !== userId) {
      await prisma.notification.create({
        data: {
          userId: document.authorId,
          type: "COMMENT",
          message: `${session.user.name} commented on your document`,
          actorId: userId,
          documentId,
        },
      });
    }

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
