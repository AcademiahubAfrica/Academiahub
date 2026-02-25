import { userPagesMetadata } from "@/app/data/Exports";
import AllForms from "@/components/user/settings/AllForms";
import SettingsHeader from "@/components/user/settings/SettingsHeader";

export const metadata = userPagesMetadata.settings;
const Page = () => {
  return (
    <main className="bg-white p-2 my-2 rounded md:mx-4 md:my-4 md:p-6 md:rounded-2xl">
      <SettingsHeader />
      <div className="lg:px-22.75 h-full md:space-y-20 py-4 lg:py-6">
        <AllForms />
      </div>
    </main>
  );
};

export default Page;
