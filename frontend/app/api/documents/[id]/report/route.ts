import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";
import { ReportReason } from "@prisma/client";

const VALID_REASONS = new Set<string>(Object.values(ReportReason));

/**
 * POST /api/documents/:id/report
 * Report a document for policy violations.
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

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      select: { authorId: true },
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    if (document.authorId === userId) {
      return NextResponse.json(
        { error: "You cannot report your own publication" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { reason, description } = body as {
      reason: string[];
      description?: string;
    };

    if (!Array.isArray(reason) || reason.length === 0) {
      return NextResponse.json(
        { error: "At least one reason is required" },
        { status: 400 }
      );
    }

    if (reason.some((r) => !VALID_REASONS.has(r))) {
      return NextResponse.json(
        { error: "Invalid report reason" },
        { status: 400 }
      );
    }

    if (reason.includes("OTHER") && (!description || !description.trim())) {
      return NextResponse.json(
        { error: "Description is required when selecting 'Other'" },
        { status: 400 }
      );
    }

    const existing = await prisma.report.findUnique({
      where: { reporterId_documentId: { reporterId: userId, documentId } },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You have already reported this publication" },
        { status: 409 }
      );
    }

    await prisma.report.create({
      data: {
        reason: reason as ReportReason[],
        description: description?.trim() || null,
        reporterId: userId,
        documentId,
      },
    });

    return NextResponse.json({ message: "Report submitted" }, { status: 201 });
  } catch (error) {
    console.error("Error reporting document:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
