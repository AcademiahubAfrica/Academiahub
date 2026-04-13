import { NextRequest, NextResponse, after } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";
import { revalidatePath } from "next/cache";
import { getReviewAggregate } from "@/lib/reviews/aggregate";

/**
 * GET /api/documents/:id/reviews
 * Return the aggregate (average, total, distribution) and the caller's current rating if any.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: documentId } = await params;
    const session = await getServerSession(authOptions);

    const [aggregate, userReview] = await Promise.all([
      getReviewAggregate(documentId),
      session?.user?.id
        ? prisma.review.findUnique({
            where: {
              userId_documentId: { userId: session.user.id, documentId },
            },
            select: { rating: true },
          })
        : Promise.resolve(null),
    ]);

    return NextResponse.json({
      aggregate,
      userRating: userReview?.rating ?? null,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

/**
 * POST /api/documents/:id/reviews
 * Upsert the caller's review. Body: { rating: 1..5 }.
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

    const body = await request.json().catch(() => null);
    const rating = body?.rating;
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be an integer between 1 and 5" },
        { status: 400 }
      );
    }

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      select: { authorId: true },
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    if (document.authorId === userId) {
      return NextResponse.json(
        { error: "Cannot review your own publication" },
        { status: 403 }
      );
    }

    await prisma.review.upsert({
      where: { userId_documentId: { userId, documentId } },
      create: { userId, documentId, rating },
      update: { rating },
    });

    after(() => {
      revalidatePath(`/publication/${documentId}`);
    });

    return NextResponse.json({ message: "Saved", rating });
  } catch (error) {
    console.error("Error saving review:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

/**
 * DELETE /api/documents/:id/reviews
 * Remove the caller's review.
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

    const existing = await prisma.review.findUnique({
      where: { userId_documentId: { userId, documentId } },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "No review to remove" }, { status: 404 });
    }

    await prisma.review.delete({
      where: { userId_documentId: { userId, documentId } },
    });

    after(() => {
      revalidatePath(`/publication/${documentId}`);
    });

    return NextResponse.json({ message: "Removed" });
  } catch (error) {
    console.error("Error removing review:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
