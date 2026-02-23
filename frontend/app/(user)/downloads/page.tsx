import { userPagesMetadata } from "@/app/data/Exports";
import Search from "@/components/user/shared/Search";
import DownloadCard from "@/components/user/dashboard/DownloadCard";
import DownloadHeader from "@/components/user/downloads/DownloadHeader";
export const metadata = userPagesMetadata.downloads;
const page = () => {
  return (
    <main>
      <Search text="downloaded" />
      <DownloadHeader />

      <DownloadCard />
    </main>
  );
};

export default page;
