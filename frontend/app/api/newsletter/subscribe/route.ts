import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const fallbackStorePath = path.join(process.cwd(), "data", "newsletter-subscribers.json");

async function loadSubscribers() {
  try {
    const content = await fs.readFile(fallbackStorePath, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) return parsed as string[];
  } catch {
    // Ignore and fall back to an empty list.
  }
  return [] as string[];
}

async function saveSubscribers(subscribers: string[]) {
  await fs.mkdir(path.dirname(fallbackStorePath), { recursive: true });
  await fs.writeFile(fallbackStorePath, JSON.stringify(subscribers, null, 2), "utf-8");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body?.email || "").toString().trim().toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // In production, require DATABASE_URL to ensure subscribers persist to the primary DB.
    if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "DATABASE_URL is required in production to persist newsletter subscribers" },
        { status: 500 }
      );
    }

    if (process.env.DATABASE_URL) {
      const { default: prisma } = await import("@/prisma/connection");
      const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ alreadySubscribed: true });
      }
      await prisma.newsletterSubscriber.create({ data: { email } });
      return NextResponse.json({ alreadySubscribed: false, message: "Subscribed successfully" });
    }

    const subscribers = await loadSubscribers();
    if (subscribers.includes(email)) {
      return NextResponse.json({ alreadySubscribed: true });
    }

    subscribers.push(email);
    await saveSubscribers(subscribers);

    return NextResponse.json({ alreadySubscribed: false, message: "Subscribed successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
