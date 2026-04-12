import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/prisma/connection";
import OnboardingStepper from "@/components/onboarding/OnboardingStepper";

export const metadata = {
  title: "Welcome | AcademiaHub",
};

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true },
  });

  return <OnboardingStepper userName={user?.name ?? ""} />;
}
