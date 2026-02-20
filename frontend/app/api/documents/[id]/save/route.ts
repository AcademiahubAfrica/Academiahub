import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";

/**
 * POST /api/documents/:id/save
 * Save/bookmark a document.
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

    const existing = await prisma.save.findUnique({
      where: { userId_documentId: { userId, documentId } },
    });

    if (existing) {
      return NextResponse.json({ error: "Already saved" }, { status: 409 });
    }

    await prisma.save.create({ data: { userId, documentId } });

    return NextResponse.json({ message: "Saved" }, { status: 201 });
  } catch (error) {
    console.error("Error saving document:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

/**
 * DELETE /api/documents/:id/save
 * Remove bookmark.
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

    const existing = await prisma.save.findUnique({
      where: { userId_documentId: { userId, documentId } },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not saved" }, { status: 404 });
    }

    await prisma.save.delete({
      where: { userId_documentId: { userId, documentId } },
    });

    return NextResponse.json({ message: "Unsaved" });
  } catch (error) {
    console.error("Error unsaving document:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
