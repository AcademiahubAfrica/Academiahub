import { Suspense } from "react";
import { userPagesMetadata } from "@/app/data/Exports";
import ProfileSection from "@/components/user/profile/ProfileSection";
import PublicationsAndLikes from "@/components/user/profile/PublicationsAndLikes";

export const metadata = userPagesMetadata.profile;
const Page = () => {
  return (
    <>
      <ProfileSection />
      <Suspense fallback={null}>
        <PublicationsAndLikes />
      </Suspense>
    </>
  );
};

export default Page;
