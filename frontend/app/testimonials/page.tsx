import { Suspense } from "react";
import { testimonialsMetadata } from "@/app/data/metadataExports";
import TestimonialsContent from "@/components/testimonials/testimonialsContent";

export const metadata = testimonialsMetadata;

export default function Testimonials() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <TestimonialsContent />
    </Suspense>
  );
}