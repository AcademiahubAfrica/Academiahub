import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";

/**
 * GET /api/profile/me
 * Get own profile with computed stats.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        Profile: {
          take: 1,
          select: { bio: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const stats = await computeStats(userId);

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      bio: user.Profile[0]?.bio ?? null,
      stats,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

/**
 * PUT /api/profile/me
 * Update own profile bio fields.
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { name, institution, department, aboutMe, state, country } =
      await request.json();

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Update user name
    await prisma.user.update({
      where: { id: userId },
      data: { name: String(name).trim() },
    });

    const existingProfile = await prisma.profile.findFirst({
      where: { userId },
      select: { id: true },
    });

    const bioData = {
      institution: String(institution ?? "").trim(),
      department: String(department ?? "").trim(),
      aboutMe: String(aboutMe ?? "").trim(),
      state: String(state ?? "").trim(),
      country: String(country ?? "").trim(),
    };

    let profile;
    if (existingProfile) {
      profile = await prisma.profile.update({
        where: { id: existingProfile.id },
        data: { bio: bioData },
      });
    } else {
      profile = await prisma.profile.create({
        data: { userId, bio: bioData },
      });
    }

    return NextResponse.json({ name: String(name).trim(), bio: profile.bio });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

async function computeStats(userId: string) {
  const [uploadCount, documents, savesReceived] = await Promise.all([
    prisma.document.count({ where: { authorId: userId } }),
    prisma.document.findMany({
      where: { authorId: userId },
      select: { downloads: true, likes: true },
    }),
    prisma.save.count({
      where: { document: { authorId: userId } },
    }),
  ]);

  const totalDownloads = documents.reduce((sum, doc) => sum + doc.downloads, 0);
  const totalLikes = documents.reduce((sum, doc) => sum + doc.likes, 0);

  return {
    uploads: uploadCount,
    downloads: totalDownloads,
    likes: totalLikes,
    saves: savesReceived,
  };
}
