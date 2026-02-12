import { Suspense } from "react";
import { userPagesMetadata } from "@/app/data/Exports";
import ProfileSection from "@/components/user/profile/ProfileSection";
import DownloadsAndLikes from "@/components/user/profile/DownloadsAndLikes";

export const metadata = userPagesMetadata.profile;
const Page = () => {
  return (
    <>
      <ProfileSection />
      <Suspense fallback={null}>
        <DownloadsAndLikes />
      </Suspense>
    </>
  );
};

export default Page;
