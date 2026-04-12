import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/prisma/connection";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  // If profile is already complete, redirect to dashboard
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      Profile: {
        take: 1,
        select: { bio: true },
      },
    },
  });

  const bio = user?.Profile[0]?.bio;
  const isProfileComplete =
    !!user?.name?.trim() &&
    !!bio?.institution?.trim() &&
    !!bio?.department?.trim() &&
    !!bio?.country?.trim() &&
    !!bio?.state?.trim();

  if (isProfileComplete) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}