import { Suspense } from "react";
import { userPagesMetadata } from "@/app/data/Exports";
import ProfileSection from "@/components/user/profile/ProfileSection";
import PublicationsAndLikes from "@/components/user/profile/PublicationsAndLikes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/prisma/connection";
import PublicationCard from "@/components/user/dashboard/PublicationCard";
import OwnPublicationCard from "@/components/user/profile/OwnPublicationCard";

export const metadata = userPagesMetadata.profile;

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const userDocuments = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      Document: {},
    },
  });

  const documents = userDocuments?.Document;
  return (
    <>
      <ProfileSection />
      <Suspense fallback={null}>
        <PublicationsAndLikes>
          <OwnPublicationCard documents={documents} />
        </PublicationsAndLikes>
      </Suspense>
    </>
  );
};

export default Page;
