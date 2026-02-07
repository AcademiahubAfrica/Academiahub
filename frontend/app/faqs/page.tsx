import JoinUs from "@/components/landing/JoinUs";
import LandingFaq from "@/components/landing/LandingFaq";
import ContactSupport from "@/components/ContactSupport";
import { faqsMetadata } from "../data/metadataExports";

export default function FAQ() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <FAQContent />
    </Suspense>
  );
}