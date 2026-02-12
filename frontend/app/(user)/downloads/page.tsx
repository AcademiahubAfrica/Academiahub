import { RiGalleryView2 } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import DownloadCard from "./DownloadCard";
import { userPagesMetadata } from "@/app/data/Exports";
import Search from "@/components/user/shared/Search";
export const metadata = userPagesMetadata.downloads;
const page = () => {
  return (
    <main>
      <Search text="downloaded" />
      <div className="px-4 lg:px-12 lg:py-4 mb-4 py-2 flex items-center justify-between ">
        <h3 className="text-lg font-medium">Total Download: 6</h3>
        <div className="gap-4  flex items-center">
          <RiGalleryView2 className="w-4.5 cursor-pointer h-4.5" />
          <FaBars className="text-grey  w-4.5 cursor-pointer h-4" />
        </div>
      </div>

      <DownloadCard />
    </main>
  );
};

export default page;
