import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";
import { revalidatePath } from "next/cache";

type Params = { params: Promise<{ id: string; commentId: string }> };

/**
 * PUT /api/documents/:id/comments/:commentId
 * Edit a comment (author only).
 */
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: documentId, commentId } = await params;
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

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true, documentId: true, createdAt: true },
    });

    if (!comment || comment.documentId !== documentId) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const hoursSinceCreation =
      (Date.now() - comment.createdAt.getTime()) / (1000 * 60 * 60);
    if (hoursSinceCreation > 72) {
      return NextResponse.json(
        { error: "Comments cannot be edited after 72 hours" },
        { status: 403 }
      );
    }

    const updated = await prisma.comment.update({
      where: { id: commentId },
      data: { content: content.trim() },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

/**
 * DELETE /api/documents/:id/comments/:commentId
 * Delete a comment (author only).
 */
export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: documentId, commentId } = await params;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true, documentId: true },
    });

    if (!comment || comment.documentId !== documentId) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.comment.delete({ where: { id: commentId } });

    after(() => {
      revalidatePath("/dashboard");
    });

    return NextResponse.json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
