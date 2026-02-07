import JoinUs from "@/components/landing/JoinUs";
import Testimonial from "@/components/Testimonial";
import { testimonialsMetadata } from "../data/metadataExports";

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