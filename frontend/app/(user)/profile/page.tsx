import { Suspense } from "react";
import { userPagesMetadata } from "@/app/data/Exports";
import ProfileSection from "@/components/user/profile/ProfileSection";
import ProfilePublications from "@/components/user/profile/ProfilePublications";

export const metadata = userPagesMetadata.profile;

const Page = () => {
  return (
    <>
      <ProfileSection />
      <Suspense fallback={null}>
        <ProfilePublications />
      </Suspense>
    </>
  );
};

export default Page;
