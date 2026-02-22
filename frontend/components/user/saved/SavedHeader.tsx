import { FaBars } from "react-icons/fa";
import { RiGalleryView2 } from "react-icons/ri";
import TotalSaved from "./TotalSaved";
import PageName from "../shared/PageName";
import MobileSearch from "../shared/MobileSearch";

const SavedHeader = () => {
  return (
    <div>
      <PageName />
      <MobileSearch placeholder={`Search for saved publications`} />

      <div className="px-4  bg-white lg:px-12 lg:py-4 mb-4 lg:mb-6 py-2 flex items-center justify-between ">
        <TotalSaved />
        <div className="gap-4 lg:gap-12 hidden md:flex items-center">
          <RiGalleryView2 />
          <FaBars className="text-grey" />
        </div>
      </div>
    </div>
  );
};

export default SavedHeader;
