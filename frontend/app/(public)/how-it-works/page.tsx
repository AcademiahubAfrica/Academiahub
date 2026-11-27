import Image from "next/image";
import { Check } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import JoinUs from "@/components/landing/JoinUs";
import { howItWorksMetadata } from "@/app/data/metadataExports";

export const metadata = howItWorksMetadata;

const steps = [
  { title: "Create Your Account", image: "/assets/images/stepone.png", alt: "Create account form", text: "Sign up with your student email to join our academic community. Verification is quick and easy.", features: ["Use your institutional email address", "Verify your student status", "Complete your profile in minutes", "Get instant access to the platform"] },
  { title: "Search & Explore", image: "/assets/images/steptwo.png", alt: "Search and explore interface", text: "Use our powerful search tools to find projects and papers relevant to your studies and access materials instantly.", features: ["Advanced filtering by subject and year", "Search by university or author", "Browse trending publications", "Save favorites for later"] },
  { title: "Share Your Work", image: "/assets/images/stepthree.png", alt: "Share your work interface", text: "Upload your completed projects to help other students and contribute to the academic community.", features: ["Submit your research papers", "Projects undergo quality review", "Receive feedback from peers", "Build your academic portfolio"] },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageHero title="How AcademiaHub Works" subtitle="Get started in minutes and access thousands of academic resources from various institutions" />

      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <h2 className="text-center text-lg md:text-2xl font-semibold text-gray-900 mb-14 md:mb-20">
          Join thousands of students already benefiting from our platform
        </h2>

        <ol className="space-y-16 md:space-y-24">
          {steps.map((step, i) => (
            // Text and card swap sides on every other step from tablet up.
            <li key={step.title} className={`flex flex-col ${i % 2 ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between gap-10 md:gap-8 lg:gap-20`}>
              <div className="w-full md:basis-1/2 lg:max-w-md">
                <span className="inline-block bg-linear-to-r from-primary-500 to-primary-700 text-white px-7 py-2.5 rounded-lg text-xl md:text-2xl font-semibold mb-5">Step {i + 1}</span>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5">{step.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-5">{step.text}</p>
                <ul className="space-y-2.5">
                  {step.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-gray-800 text-xs md:text-sm">
                      <span className="size-4.5 shrink-0 rounded-full bg-primary-500 flex items-center justify-center">
                        <Check strokeWidth={3} className="size-3 text-white" aria-hidden />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full max-w-xs sm:max-w-sm md:max-w-none md:basis-1/2 flex md:justify-center">
                <div className="w-full max-w-sm bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] border-b-4 border-primary-400 p-5 pb-8 text-center">
                  <div className="relative w-full aspect-310/187 rounded-lg overflow-hidden mb-6">
                    <Image src={step.image} alt={step.alt} fill sizes="(min-width: 640px) 384px, 320px" className="object-contain" priority={i === 0} />
                  </div>
                  <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1.5">{step.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed px-4">{step.text.split(".")[0]}.</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <JoinUs />
    </main>
  );
}
