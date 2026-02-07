import { Suspense } from "react";
import ExploreContent from "@/components/explore/exploreContent";

const ExplorePage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
};

export default ExplorePage;