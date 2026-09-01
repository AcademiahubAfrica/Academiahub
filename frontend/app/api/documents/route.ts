import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";
import { DOCUMENT_CARD_SELECT } from "@/lib/documentSelect";
import { v2 as cloudinary } from "cloudinary";
import {
  checkUploadedSize,
  deriveDocumentFileKey,
  parseResourceType,
} from "@/lib/cloudinary/documentAsset";
import type { Prisma } from "@prisma/client";
import { denied } from "@/lib/logging/denied";
import {
  documentSchema,
  MAX_DOCUMENT_BYTES,
} from "@/lib/schemas/documentSchema";
import { isObjectId, positiveInt } from "@/lib/queryParams";

type DocumentCategory = "RESEARCH" | "SEMINAR" | "PROJECT" | "ANALYSIS";

const CATEGORY_MAP: Record<string, DocumentCategory> = {
  research: "RESEARCH",
  seminar: "SEMINAR",
  project: "PROJECT",
  analysis: "ANALYSIS",
};

const SORT_OPTIONS: Record<string, Prisma.DocumentFindManyArgs["orderBy"]> = {
  recent: { createdAt: "desc" },
  oldest: { createdAt: "asc" },
  popular: [{ likes: "desc" }, { createdAt: "desc" }],
};

/** Pagination ceilings. A caller asking for more gets this many. */
const MAX_PAGE_SIZE = 50;
const DEFAULT_PAGE_SIZE = 12;

export async function POST(request: NextRequest) {
  try {
    // Kick off body parse and session check in parallel — they're independent.
    const [session, body] = await Promise.all([
      getServerSession(authOptions),
      request.json().catch(() => null),
    ]);

    if (!session?.user?.id) {
      return denied({
        route: "/api/documents",
        reason: "no_session",
      });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const parsed = documentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid publication" },
        { status: 400 },
      );
    }

    const {
      title,
      description,
      category,
      institution,
      year,
      fileUrl,
      fileName,
    } = parsed.data;

    /* The storage key is what a later delete acts on, so it is derived from
       the URL we just validated rather than read from the body. Taking it from
       the caller would let an upload point at somebody else's asset. */
    const fileKey = deriveDocumentFileKey(fileUrl);
    if (!fileKey) {
      return NextResponse.json({ error: "Invalid file URL" }, { status: 400 });
    }

    /* The size in the body is the uploader's own claim about a file they sent
       straight to Cloudinary, so it says nothing. Cloudinary is asked instead.
       This also confirms the asset exists and is where the URL said it was. */
    const resourceType = parseResourceType(fileUrl);
    const sizeCheck = await checkUploadedSize(
      fileKey,
      resourceType,
      MAX_DOCUMENT_BYTES,
    );

    if (sizeCheck.status === "unverifiable") {
      /* Refuses rather than falling back to the claimed size, which would put
         the honour system back. The asset is left alone: deleting on a lookup
         that did not complete risks destroying a good upload. */
      return NextResponse.json(
        { error: "Could not verify the uploaded file. Please try again." },
        { status: 502 },
      );
    }

    if (sizeCheck.status === "too_large") {
      /* Already stored and already being paid for by this point, so it goes
         now rather than lingering as an orphan. Best effort: a failure here
         must not turn a rejected upload into a 500. */
      try {
        await cloudinary.uploader.destroy(fileKey, {
          resource_type: resourceType,
          invalidate: true,
        });
      } catch (destroyError) {
        console.error("Failed to remove oversized upload", fileKey, destroyError);
      }

      return NextResponse.json(
        { error: "File exceeds 10 MB limit" },
        { status: 400 },
      );
    }

    const document = await prisma.document.create({
      data: {
        title,
        description,
        category: CATEGORY_MAP[category],
        institution,
        year,
        fileUrl,
        fileKey,
        fileName,
        fileSize: sizeCheck.bytes, // The measured size, never the claimed one.
        authorId: session.user.id,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json(
      { error: "Failed to create document" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const authorId = searchParams.get("authorId");
    const category = searchParams.get("category");
    const q = searchParams.get("q");
    const sort = searchParams.get("sort") || "recent";
    const page = positiveInt(searchParams.get("page"), 1, Number.MAX_SAFE_INTEGER);
    const limit = positiveInt(
      searchParams.get("limit"),
      DEFAULT_PAGE_SIZE,
      MAX_PAGE_SIZE,
    );

    const where: Prisma.DocumentWhereInput = {};

    if (authorId) {
      /* Checked rather than passed through: an id that is not an ObjectId
         makes Prisma raise instead of returning nothing. */
      if (!isObjectId(authorId)) {
        return NextResponse.json({ error: "Invalid authorId" }, { status: 400 });
      }
      where.authorId = authorId;
    }

    if (category && category !== "all") {
      /* Was `category.toUpperCase() as ...`, which asserted rather than
         checked — an unknown category reached Prisma as an invalid enum value
         and came back as a 500. */
      const mapped = CATEGORY_MAP[category.toLowerCase()];
      if (!mapped) {
        return NextResponse.json({ error: "Invalid category" }, { status: 400 });
      }
      where.category = mapped;
    }

    if (q && q.trim().length > 0) {
      const term = q.trim();
      where.OR = [
        { title: { contains: term, mode: "insensitive" } },
        { description: { contains: term, mode: "insensitive" } },
        { institution: { contains: term, mode: "insensitive" } },
        { author: { is: { name: { contains: term, mode: "insensitive" } } } },
      ];
    }

    const skip = (page - 1) * limit;

    const [documents, total, session] = await Promise.all([
      prisma.document.findMany({
        where,
        select: DOCUMENT_CARD_SELECT,
        orderBy: SORT_OPTIONS[sort] ?? SORT_OPTIONS.recent,
        skip,
        take: limit,
      }),
      prisma.document.count({ where }),
      getServerSession(authOptions),
    ]);

    const userId = session?.user?.id;
    let documentsWithUserState: Array<
      (typeof documents)[number] & { isLiked?: boolean; isSaved?: boolean }
    > = documents;

    if (userId && documents.length > 0) {
      const documentIds = documents.map((d) => d.id);
      const [likes, saves] = await Promise.all([
        prisma.like.findMany({
          where: { userId, documentId: { in: documentIds } },
          select: { documentId: true },
        }),
        prisma.save.findMany({
          where: { userId, documentId: { in: documentIds } },
          select: { documentId: true },
        }),
      ]);
      const likedSet = new Set(likes.map((l) => l.documentId));
      const savedSet = new Set(saves.map((s) => s.documentId));
      documentsWithUserState = documents.map((d) => ({
        ...d,
        isLiked: likedSet.has(d.id),
        isSaved: savedSet.has(d.id),
      }));
    }

    return NextResponse.json({
      documents: documentsWithUserState,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}
