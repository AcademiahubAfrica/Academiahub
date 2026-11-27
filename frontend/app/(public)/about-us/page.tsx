import Image from "next/image";
import { BiTargetLock } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import PageHero from "@/components/shared/PageHero";
import JoinUs from "@/components/landing/JoinUs";
import { aboutUsMetadata } from "@/app/data/metadataExports";

export const metadata = aboutUsMetadata;

const story = [
  "AcademiaHub was born from a simple observation: students across different universities were struggling to access quality research materials, while countless valuable academic projects remained locked away in institutional archives.",
  "Founded in 2025 by a group of graduate students, we set out to create a platform that would break down these barriers. What started as a small repository has grown into a thriving community of researchers, students, and academics from over 100 institutions worldwide.",
  "Today, we're proud to facilitate knowledge sharing, foster collaboration, and support the academic journeys of thousands of students every day.",
];

const values = [
  { title: "Our Mission", Icon: BiTargetLock, card: "bg-primary-100", icon: "bg-primary-500", text: "To democratize access to quality academic research by creating a platform where students can freely share, discover, and collaborate on scholarly work across institutions and borders." },
  { title: "Our Vision", Icon: AiOutlineEye, card: "bg-[#FFF9E5]", icon: "bg-[#FACC15]", text: "To become the world's leading academic collaboration platform, fostering a global community of researchers and students who advance knowledge together through open sharing and peer collaboration." },
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero title="About AcademiaHub" subtitle="Built by students, for students. Making academic research accessible, collaborative, and rewarding." />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-14 lg:py-16">
        <section className="flex flex-col md:flex-row items-center gap-8 lg:gap-14">
          <div className="w-full md:basis-1/2 space-y-4 text-gray-900">
            <h2 className="text-lg lg:text-xl font-bold">Our Story</h2>
            {story.map((p) => <p key={p} className="text-sm lg:text-base leading-relaxed">{p}</p>)}
          </div>
          {/* Photo comes first on phones. Its rounded corners and glow are baked in. */}
          <div className="w-full max-w-md md:max-w-none md:basis-1/2 order-first md:order-0">
            <Image className="w-full h-auto" src="/assets/images/LandingPage/about-img.png" alt="A man and woman laughing in front of their educational institution" width={375} height={256} priority />
          </div>
        </section>

        <section className="mt-20 lg:mt-36 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-4xl mx-auto">
          {values.map(({ title, Icon, card, icon, text }) => (
            <div key={title} className={`${card} rounded-xl p-6 lg:p-8`}>
              <div className={`${icon} text-white size-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="text-2xl" aria-hidden />
              </div>
              <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm lg:text-base text-gray-800 leading-relaxed">{text}</p>
            </div>
          ))}
        </section>
      </div>

      <JoinUs />
    </main>
  );
}
