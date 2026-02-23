import { FaBars } from "react-icons/fa";
import { RiGalleryView2 } from "react-icons/ri";
import PageName from "../shared/PageName";
import MobileSearch from "../shared/MobileSearch";

const DownloadHeader = () => {
  return (
    <div className="">
      <PageName />
      <MobileSearch placeholder={`Search for downloaded publications`} />

      <div className="px-4 bg-white lg:px-12 lg:py-4 md:mb-4 mb-2 flex items-center justify-between ">
        <h3 className="md:text-lg text-sm font-normal md:font-medium">
          Total Download: 6
        </h3>
        <div className="gap-4 hidden  md:flex items-center">
          <RiGalleryView2 className="w-4.5 cursor-pointer h-4.5" />
          <FaBars className="text-grey  w-4.5 cursor-pointer h-4" />
        </div>
      </div>
    </div>
  );
};

export default DownloadHeader;
