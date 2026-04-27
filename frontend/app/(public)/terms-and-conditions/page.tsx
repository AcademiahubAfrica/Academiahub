import TermsOfService from "@/components/policies/TermsOfService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the legally binding terms and conditions for using the AcademiaHub Africa research platform, covering user conduct, intellectual property, and academic integrity.",
};
export default function TAndCPage() {
  return (
    <main>
      <section className="h-59 md:h-75.75 flex items-center justify-center flex-col bg-linear-to-r from-[#E9EBF3] via-[#FFFBE6] to-[#E9EBF3]">
        <h1 className="text-2xl leading-7 font-medium tracking-normal md:font-semibold md:leading-10 md:text-4xl">
          Terms and Conditions
        </h1>
      </section>

      <section className="p-0 lg:p-25 w-full mx-auto max-w-304.25">
        <TermsOfService />
      </section>
    </main>
  );
}
