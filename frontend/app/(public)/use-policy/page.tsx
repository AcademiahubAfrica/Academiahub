import AcceptableUsePolicy from "@/components/policies/AcceptUsePolicy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceptable Use Policy | AcademiaHub Africa",
  description:
    "Guidelines and standards for research, content, and community conduct on the AcademiaHub Africa platform.",
};
export default function UsePolicyPage() {
  return (
    <main>
      <section className="h-59 md:h-75.75 flex items-center justify-center flex-col bg-linear-to-r from-[#E9EBF3] via-[#FFFBE6] to-[#E9EBF3]">
        <h1 className="text-2xl leading-7 font-medium tracking-normal md:font-semibold md:leading-10 md:text-4xl">
          Acceptable Use Policy
        </h1>
      </section>

      <section className="p-0 lg:p-25 w-full mx-auto max-w-304.25">
        <AcceptableUsePolicy />
      </section>
    </main>
  );
}
