import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";
import type { Prisma } from "@prisma/client";

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

const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024;

function isValidDocumentUrl(url: string): boolean {
  const cloudName = (process.env.CLOUDINARY_URL || "").match(
    /@([^/?#]+)/,
  )?.[1];
  if (!cloudName) return false;
  return (
    url.startsWith(`https://res.cloudinary.com/${cloudName}/`) &&
    url.includes("/academiahub/documents/")
  );
}

const REQUIRED_FIELDS = [
  "title",
  "description",
  "category",
  "institution",
  "year",
  "fileUrl",
  "fileKey",
  "fileName",
] as const;

export async function POST(request: NextRequest) {
  try {
    // Kick off body parse and session check in parallel — they're independent.
    const [session, body] = await Promise.all([
      getServerSession(authOptions),
      request.json().catch(() => null),
    ]);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const {
      title,
      description,
      category,
      institution,
      year,
      fileUrl,
      fileKey,
      fileName,
      fileSize,
    } = body;

    for (const field of REQUIRED_FIELDS) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    const categoryEnum =
      typeof category === "string" ? CATEGORY_MAP[category.toLowerCase()] : undefined;
    if (!categoryEnum) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    if (typeof fileUrl !== "string" || !isValidDocumentUrl(fileUrl)) {
      return NextResponse.json(
        { error: "Invalid file URL" },
        { status: 400 },
      );
    }

    if (typeof fileSize !== "number" || fileSize > MAX_DOCUMENT_BYTES) {
      return NextResponse.json(
        { error: "File exceeds 10 MB limit" },
        { status: 400 },
      );
    }

    const document = await prisma.document.create({
      data: {
        title,
        description,
        category: categoryEnum,
        institution,
        year,
        fileUrl,
        fileKey,
        fileName,
        fileSize,
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
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "12")));

    const where: Prisma.DocumentWhereInput = {};

    if (authorId) {
      where.authorId = authorId;
    }

    if (category && category !== "all") {
      where.category = category.toUpperCase() as Prisma.DocumentWhereInput["category"];
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
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          _count: {
            select: { commentRecords: true },
          },
        },
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
