import { userPagesMetadata } from "@/app/data/Exports";
import Header from "../analytics/Header";
import Form from "./Form";

export const metadata = userPagesMetadata.settings;
const page = () => {
  return (
    <>
      <Header />
      <div className="pl-[91px]">
        <Form />
      </div>
    </>
  );
};

export default page;
