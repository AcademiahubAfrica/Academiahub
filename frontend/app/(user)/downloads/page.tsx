import { Suspense } from "react";
import { userPagesMetadata } from "@/app/data/Exports";
import Search from "@/components/user/shared/Search";
import PageName from "@/components/user/shared/PageName";
import MobileSearch from "@/components/user/shared/MobileSearch";
import DownloadedDocuments from "@/components/user/downloads/DownloadedDocuments";

export const metadata = userPagesMetadata.downloads;

const Page = () => {
  return (
    <main>
      <Search text="downloaded" />
      <PageName />
      <MobileSearch placeholder="Search for downloaded publications" />

      <Suspense fallback={null}>
        <DownloadedDocuments />
      </Suspense>
    </main>
  );
};

export default Page;
