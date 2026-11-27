import { Zap, Lock, Globe, TrendingUp, FileText, MessageCircle } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import JoinUs from "@/components/landing/JoinUs";
import { featuresMetadata } from "@/app/data/metadataExports";

export const metadata = featuresMetadata;

const benefits = [
  { Icon: Zap, title: "Lightning Fast", text: "Access publications in seconds with our optimized platform infrastructure." },
  { Icon: Lock, title: "Secure & Private", text: "Your data is encrypted and protected with industry-standard security measures." },
  { Icon: Globe, title: "Multi-University Network", text: "Access content from over 100 institutions across multiple countries." },
  { Icon: TrendingUp, title: "Track Progress", text: "Monitor your research journey and downloads with detailed analytics." },
  { Icon: FileText, title: "Plagiarism Check", text: "All submissions go through rigorous plagiarism detection before approval." },
  { Icon: MessageCircle, title: "Discussion Forums", text: "Engage in meaningful conversations with researchers and peers." },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero title="Features for Academic Success" subtitle="Everything you need to access, share, and discover quality academic publications in one comprehensive platform." />
      <WhyChooseUs fancyStyle={false} />

      <section className="bg-primary-100 py-14 md:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-8 md:mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Additional Benefits</h2>
            <p className="text-sm md:text-base text-gray-700">Even more reasons to choose AcademiaHub for your academic research needs</p>
          </header>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {benefits.map(({ Icon, title, text }) => (
              <li key={title} className="bg-white rounded-xl px-6 py-9 md:py-11 flex flex-col items-center text-center">
                <span className="size-14 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] flex items-center justify-center mb-5">
                  <Icon className="size-6 text-gray-900" strokeWidth={2} aria-hidden />
                </span>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-60">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JoinUs />
    </main>
  );
}
