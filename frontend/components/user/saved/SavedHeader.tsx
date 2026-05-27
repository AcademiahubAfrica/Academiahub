import TotalSaved from "./TotalSaved";
import PageName from "../shared/PageName";
import MobileSearch from "../shared/MobileSearch";

const SavedHeader = ({ count }: { count: number }) => {
  return (
    <div>
      <PageName />
      <MobileSearch placeholder={`Search for saved publications`} />

      <div className="px-4  bg-white lg:px-12 lg:py-4 mb-4 lg:mb-6 py-2 flex items-center justify-between ">
        <TotalSaved count={count} />
      </div>
    </div>
  );
};

export default SavedHeader;
