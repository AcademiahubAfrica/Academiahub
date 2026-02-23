import { userPagesMetadata } from "@/app/data/Exports";
import PageName from "@/components/user/shared/PageName";
import UploadForm from "@/components/user/uploads/UploadForm";
export const metadata = userPagesMetadata.uploads;
const page = () => {
  return (
    <main className="bg-white  mt-2 rounded-2xl md:p-4 md:m-4">
      <PageName />
      <UploadForm />
    </main>
  );
};

export default page;
