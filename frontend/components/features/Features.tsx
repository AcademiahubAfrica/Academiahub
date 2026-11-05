import AdditionalBenefits from "../../components/features/AdditionalBenefits";
import JoinUs from "@/components/landing/JoinUs";
import { featuresMetadata } from "@/app/data/metadataExports";
import WhyChooseUs from "../landing/WhyChooseUs";

export const metadata = featuresMetadata;

const Features = () => {
  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
            {/* Search Section */}
           <section className="bg-linear-to-r from-[#E9EBF3] via-[#FFFBE6] to-[#E9EBF3] border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 ">
                      <div className="text-center mb-8">
            <h1 className="text-xl md:text-4xl font-medium md:font-semibold md:leading-10 mb-4">
             Features for Academic Success
            </h1>
            <p className="text-sm leading-4.5 md:text-2xl md:leading-[100%] text-gray-600 max-w-3xl mx-auto">
             Everything you need to access, share, and discover quality
                            academic publications in one comprehensive platform.{" "}
            </p>
          </div>
                </div>
            </section>
            <WhyChooseUs fancyStyle={false}/>
            <AdditionalBenefits />
            <JoinUs />
    </main>
  )
}

export default Features
