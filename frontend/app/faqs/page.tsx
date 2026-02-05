import { Suspense } from "react";
import { faqData } from "@/app/data/faqData";
import FAQContent from "@/components/faqs/faqContent";

export const metadata = faqData;

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