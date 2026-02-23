import { userPagesMetadata } from "@/app/data/Exports";
import Search from "@/components/user/shared/Search";
import SavedList from "@/components/user/saved/SavedList";
import SavedHeader from "@/components/user/saved/SavedHeader";

export const metadata = userPagesMetadata.saved;
const Page = () => {
  return (
    <main>
      <Search />

      <SavedHeader />
      <SavedList />
    </main>
  );
};

export default Page;
