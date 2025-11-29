import { userPagesMetadata } from "@/app/data/Exports";
import UploadForm from "./UploadForm";
export const metadata = userPagesMetadata.uploads;
const page = () => {
  return (
    <main>
      <UploadForm />
    </main>
  );
};

export default page;
