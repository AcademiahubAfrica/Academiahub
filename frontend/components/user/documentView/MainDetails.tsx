import Comments from "./Comments";
import PublicationDetails from "./PublicationDetails";

const MainDetails = () => {
  return (
    <div className="lg:w-2/3 space-y-5.75 ">
      <PublicationDetails />
      {/* COMMENTS */}
      <Comments />
    </div>
  );
};

export default MainDetails;
