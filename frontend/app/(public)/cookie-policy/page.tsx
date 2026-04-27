import CookiePolicy from "@/components/policies/CookiePolicy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | AcademiaHub Africa",
  description:
    "Learn how AcademiaHub Africa uses cookies and tracking technologies to improve your research experience and maintain platform security.",
};
export default function CookiePolicyPage() {
  return (
    <main>
      <section className="h-59 md:h-75.75 flex items-center justify-center flex-col bg-linear-to-r from-[#E9EBF3] via-[#FFFBE6] to-[#E9EBF3]">
        <h1 className="text-2xl leading-7 font-medium tracking-normal md:font-semibold md:leading-10 md:text-4xl">
          Cookie Policy
        </h1>
      </section>

      <section className="p-0 lg:p-25 w-full mx-auto max-w-304.25">
        <CookiePolicy />
      </section>
    </main>
  );
}
