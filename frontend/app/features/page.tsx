import { Suspense } from "react";
import { featuresMetadata } from "@/app/data/metadataExports";
import FeaturesContent from "@/components/features/featuresContent";

export const metadata = featuresMetadata;

export default function Features() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <FeaturesContent />
    </Suspense>
  );
}