import { Suspense } from "react";
import { userPagesMetadata } from "@/app/data/Exports";
import DownloadsAndLikes from "../../../components/user/profile/DownloadsAndLikes";
import ProfileSection from "../../../components/user/profile/ProfileSection";

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
