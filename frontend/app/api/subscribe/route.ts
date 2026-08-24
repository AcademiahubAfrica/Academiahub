import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "@/prisma/connection";

const subscribeSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(254),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = subscribeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid email address" },
      { status: 400 },
    );
  }

  try {
    await prisma.newsletterSubscriber.create({
      data: { email: parsed.data.email.toLowerCase() },
    });
    return NextResponse.json({ message: "Subscribed successfully" }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { message: "This email address is already subscribed" },
        { status: 409 },
      );
    }

    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { message: "Unable to subscribe. Please try again." },
      { status: 500 },
    );
  }
}
