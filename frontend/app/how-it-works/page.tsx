import { Suspense } from "react";
import { howItWorksMetadata } from "@/app/data/metadataExports";
import HowItWorksContent from "@/components/how-it-works/howItWorksContent";

export const metadata = howItWorksMetadata;

export default function HowItWorks() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <HowItWorksContent />
    </Suspense>
  );
}