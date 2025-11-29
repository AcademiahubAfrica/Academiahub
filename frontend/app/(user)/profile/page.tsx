import { userPagesMetadata } from "@/app/data/Exports";
import DownloadsAndLikes from "./DownloadsAndLikes";
import ProfileSection from "./ProfileSection";

export const metadata = userPagesMetadata.profile;
const Page = () => {
  return (
    <>
      <ProfileSection />
      <DownloadsAndLikes />
    </>
  );
};

export default Page;
