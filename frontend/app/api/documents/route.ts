import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
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

    // Validate required fields
    if (!title || !description || !category || !institution || !year || !fileUrl || !fileKey || !fileName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Map category string to enum
    const categoryMap: Record<string, "RESEARCH" | "SEMINAR" | "PROJECT" | "ANALYSIS"> = {
      research: "RESEARCH",
      seminar: "SEMINAR",
      project: "PROJECT",
      analysis: "ANALYSIS",
    };

    const categoryEnum = categoryMap[category.toLowerCase()];
    if (!categoryEnum) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
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
        fileSize: fileSize || 0,
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
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "12")));

    const where: Record<string, unknown> = {};

    if (authorId) {
      where.authorId = authorId;
    }

    if (category && category !== "all") {
      where.category = category.toUpperCase();
    }

    if (q && q.trim().length > 0) {
      where.title = { contains: q.trim(), mode: "insensitive" };
    }

    const skip = (page - 1) * limit;

    const [documents, total] = await Promise.all([
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
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.document.count({ where }),
    ]);

    return NextResponse.json({
      documents,
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
