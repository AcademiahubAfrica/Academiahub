import { RiGalleryView2 } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { userPagesMetadata } from "@/app/data/Exports";
import Search from "@/components/user/shared/Search";
import TotalSaved from "@/components/user/saved/TotalSaved";
import SavedList from "@/components/user/saved/SavedList";

export const metadata = userPagesMetadata.saved;
const Page = () => {
  return (
    <main>
      <Search />

      <div className="px-4 lg:px-12 lg:py-4 mb-4 py-2 flex items-center justify-between ">
        <TotalSaved />
        <div className="gap-4 lg:gap-12 flex items-center">
          <RiGalleryView2 />
          <FaBars className="text-grey" />
        </div>
      </div>
      <SavedList />
    </main>
  );
};

export default Page;
