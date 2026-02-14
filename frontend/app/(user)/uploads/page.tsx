import { userPagesMetadata } from "@/app/data/Exports";
import UploadForm from "@/components/user/uploads/UploadForm";
export const metadata = userPagesMetadata.uploads;
const page = () => {
  return (
    <main>
      <UploadForm />
    </main>
  );
};

export default page;
