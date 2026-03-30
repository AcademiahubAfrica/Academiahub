import { userPagesMetadata } from "@/app/data/Exports";
import Search from "@/components/user/shared/Search";
import SavedDocuments from "@/components/user/saved/SavedDocuments";

export const metadata = userPagesMetadata.saved;

const SavedPage = () => {
  return (
    <main>
      <Search />
      <SavedDocuments />
    </main>
  );
};

export default SavedPage;