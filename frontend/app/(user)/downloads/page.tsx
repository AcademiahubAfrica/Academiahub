import { userPagesMetadata } from "@/app/data/Exports";
import Search from "@/components/user/shared/Search";
import PublicationCard from "@/components/user/dashboard/PublicationCard";
import DownloadHeader from "@/components/user/downloads/DownloadHeader";
export const metadata = userPagesMetadata.downloads;
const page = () => {
  return (
    <main>
      <Search text="downloaded" />
      <DownloadHeader />

      <PublicationCard />
    </main>
  );
};

export default page;
