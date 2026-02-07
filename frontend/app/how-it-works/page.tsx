import SetupSteps from "@/components/SetupSteps";
import JoinUs from "@/components/landing/JoinUs";
import { howItWorksMetadata } from "../data/metadataExports";

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