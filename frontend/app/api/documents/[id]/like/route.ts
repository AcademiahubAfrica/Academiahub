import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";

/**
 * POST /api/documents/:id/like
 * Like a document.
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

    const existing = await prisma.like.findUnique({
      where: { userId_documentId: { userId, documentId } },
    });

    if (existing) {
      return NextResponse.json({ error: "Already liked" }, { status: 409 });
    }

    await prisma.$transaction([
      prisma.like.create({ data: { userId, documentId } }),
      prisma.document.update({
        where: { id: documentId },
        data: { likes: { increment: 1 } },
      }),
    ]);

    // Notify document author
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      select: { authorId: true },
    });

    if (document && document.authorId !== userId) {
      await prisma.notification.create({
        data: {
          userId: document.authorId,
          type: "LIKE",
          message: `${session.user.name} liked your document`,
          actorId: userId,
          documentId,
        },
      });
    }

    return NextResponse.json({ message: "Liked" }, { status: 201 });
  } catch (error) {
    console.error("Error liking document:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

/**
 * DELETE /api/documents/:id/like
 * Unlike a document.
 */
export async function DELETE(
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

    const existing = await prisma.like.findUnique({
      where: { userId_documentId: { userId, documentId } },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not liked" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.like.delete({
        where: { userId_documentId: { userId, documentId } },
      }),
      prisma.document.update({
        where: { id: documentId },
        data: { likes: { decrement: 1 } },
      }),
    ]);

    return NextResponse.json({ message: "Unliked" });
  } catch (error) {
    console.error("Error unliking document:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
