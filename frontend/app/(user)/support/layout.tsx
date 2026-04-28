import LandingFaq from "@/components/landing/LandingFaq";
import { Metadata } from "next";
import { ReactNode } from "react";
import { CiMail } from "react-icons/ci";

export const metadata: Metadata = {
  title: {
    absolute: "Help and Support",
  },
  description: "this is where you come when you need assistance with the app",
};
export default function SupportLayout({ children }: { children: ReactNode }) {
  return (
    <main className="pb-6 mt-4 px-2 md:px-6">
      {children}

      <div className=" ">
        <LandingFaq hideHeader={true} fullWidth={true} />
      </div>

      <div className=" py-10 lg:py-17 px-4 sm:px-6 w-full mx-auto bg-primary-light-hover rounded-md  md:px-16 md:py-20 text-center shadow-lg">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Still Have Questions?
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Our support team is here to help you with any questions or concerns
        </p>
        <div className="flex items-center justify-center">
          <a
            href="mailto:message@mail.academiahubafrica.org"
            className="flex items-center gap-2"
          >
            <CiMail /> message@mail.academiahubafrica.org
          </a>
        </div>
      </div>
    </main>
  );
}
