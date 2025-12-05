import { Suspense } from "react";
import { userPagesMetadata } from "@/app/data/Exports";
import DownloadsAndLikes from "./DownloadsAndLikes";
import ProfileSection from "./ProfileSection";

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
