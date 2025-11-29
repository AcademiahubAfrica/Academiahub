"use client";
import { useSaved } from "@/app/_contexts/SavedContext";
import EmptySection from "@/components/EmptySection";
import Search from "./Search";
import CardSection from "@/components/CardSection";
import { RiGalleryView2 } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { userPagesMetadata } from "@/app/data/Exports";

export const metadata = userPagesMetadata.saved;
const Page = () => {
  const { saved } = useSaved();
  return (
    <main>
      <Search />

      <div className="px-4 lg:px-12 lg:py-4 mb-4 py-2 flex items-center justify-between ">
        <h3 className="text-lg font-medium">Total Saved: {saved.length}</h3>
        <div className="gap-4 lg:gap-12 flex items-center">
          <RiGalleryView2 />
          <FaBars className="text-grey" />
        </div>
      </div>
      {saved.length ? (
        <CardSection displayData={saved} />
      ) : (
        <EmptySection
          title="No saved publications yet"
          text="Materials you saved will appear here for easy access"
        />
      )}
    </main>
  );
};

export default Page;
