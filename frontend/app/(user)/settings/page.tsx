import { userPagesMetadata } from "@/app/data/Exports";
import Header from "../analytics/Header";
import Form from "./Form";

export const metadata = userPagesMetadata.settings;
const page = () => {
  return (
    <>
      <Header />
      <div className="lg:pl-22.75">
        <Form />
      </div>
    </>
  );
};

export default page;
