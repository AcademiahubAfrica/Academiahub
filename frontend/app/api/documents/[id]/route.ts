import { NextRequest, NextResponse, after } from "next/server";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";
import {
  deriveDocumentFileKey,
  parseResourceType,
} from "@/lib/cloudinary/documentAsset";
import { denied } from "@/lib/logging/denied";
import { isObjectId } from "@/lib/queryParams";

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
      return denied({
        route: "/api/documents/[id]",
        reason: "no_session",
      });
    }

    const { id: documentId } = await params;
    if (!isObjectId(documentId)) {
      return NextResponse.json(
        { error: "Invalid document id" },
        { status: 400 },
      );
    }

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

/**
 * DELETE /api/documents/:id
 * Delete a document (author only). Removes the Cloudinary asset best-effort,
 * then deletes the row — Prisma cascades clean up likes/comments/saves/etc.
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return denied({
        route: "/api/documents/[id]",
        reason: "no_session",
      });
    }

    const { id: documentId } = await params;
    if (!isObjectId(documentId)) {
      return NextResponse.json(
        { error: "Invalid document id" },
        { status: 400 },
      );
    }

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      select: { authorId: true, fileUrl: true },
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    if (document.authorId !== session.user.id) {
      /* An attempt to delete somebody else's publication, and the file behind
         it. Irreversible had it succeeded, so the record matters. */
      return denied({
        route: "/api/documents/[id]",
        status: 403,
        reason: "not_document_owner",
        userId: session.user.id,
        detail: { documentId, action: "delete" },
      });
    }

    /* Recompute the key from the stored URL instead of trusting the stored
       `fileKey`. Rows created before the key was derived server-side may hold
       a value that never matched their own file, and destroy() acts on
       whatever key it is given. */
    const fileKey = deriveDocumentFileKey(document.fileUrl);

    if (!fileKey) {
      console.error(
        "Skipping Cloudinary destroy: unrecognised file URL on document",
        documentId,
      );
    } else {
      cloudinary.config({ secure: true });
      try {
        await cloudinary.uploader.destroy(fileKey, {
          resource_type: parseResourceType(document.fileUrl),
          invalidate: true,
        });
      } catch (cloudErr) {
        // Best-effort: log and continue. An orphaned Cloudinary asset is
        // recoverable via a sweeper; a dangling DB row pointing at a deleted
        // file is not.
        console.error("Cloudinary destroy failed for", fileKey, cloudErr);
      }
    }

    await prisma.document.delete({ where: { id: documentId } });

    after(() => {
      revalidatePath("/dashboard");
    });

    return NextResponse.json({ message: "Document deleted" });
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
