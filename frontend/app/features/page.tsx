import ChooseUs from "../../components/landing/LandingChooseUs";
import AdditionalBenefits from "../../components/AdditionalBenefits";
import JoinUs from "@/components/landing/JoinUs";
import { featuresMetadata } from "../data/metadataExports";

export const metadata = featuresMetadata;

export default function Features() {
	return (
		<main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
			{/* Search Section */}
			<section className="bg-linear-to-br from-gray-300 via-yellow-200 to-gray-200 border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 ">
					<div className="text-center mb-8">
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
							Features for Academic Success
						</h1>
						<p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
							Everything you need to access, share, and discover quality
							academic publications in one comprehensive platform.{" "}
						</p>
					</div>
				</div>
			</section>
			<ChooseUs />
			<AdditionalBenefits />
			<JoinUs />
		</main>
	);
}
