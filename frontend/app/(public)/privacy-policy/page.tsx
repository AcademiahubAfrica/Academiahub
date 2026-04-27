import { Metadata } from "next";
import PrivacyPolicy from "../../../components/policies/PrivacyDocument";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how AcademiaHub Africa collects, protects, and manages your personal data in compliance with the Nigeria Data Protection Act (NDPA) and African Union frameworks.",
};
export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="h-59 md:h-75.75 flex items-center justify-center flex-col bg-linear-to-r from-[#E9EBF3] via-[#FFFBE6] to-[#E9EBF3]">
        <h1 className="text-2xl leading-7 font-medium tracking-normal md:font-semibold md:leading-10 md:text-4xl">
          Privacy Policy
        </h1>
      </section>

      <section className="p-0 lg:p-25 w-full mx-auto max-w-304.25">
        <PrivacyPolicy />
      </section>
    </main>
  );
}
