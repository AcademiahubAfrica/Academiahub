import Image from "next/image";
import { testimonialsData } from "@/app/data/testimonialsData";
import { Star } from "lucide-react";

const LandingUserSay = () => {
	// Limit to first 3 testimonials
	const limitedTestimonials = testimonialsData.slice(0, 3);

	const renderStars = (rating: number) => {
		return (
			<div className="flex gap-1">
				{[1, 2, 3, 4, 5].map((star) => (
					<Star
						key={star}
						className={`w-5 h-5 ${
							star <= rating
								? 'fill-yellow-400 text-yellow-400'
								: 'fill-gray-300 text-gray-300'
						}`}
					/>
				))}
			</div>
		);
	};

	return (
		<div className="mb-8.5 mt-9.75">
			<div>
				<header className="mb-6">
					<h1 className="font-medium text-black text-xl leading-[130%] text-center mb-4 lg:font-bold lg:text-[32px] lg:leading-[100%]">
						What Our Users Say
					</h1>
					<h3 className="font-medium text-black text-sm leading-[130%] text-center lg:font-normal lg:text-2xl lg:leading-[100%]">
						Hear from students, researchers, and educators who use AcademiaHub
						every day
					</h3>
				</header>

				<div className="flex flex-wrap gap-4 justify-center p-2">
					{limitedTestimonials.map((testimonial) => (
						<section
							key={testimonial.id}
							className="flex flex-col gap-4 border border-[#D9D9D9] w-full md:w-106 lg:w-108 rounded-[12px] p-6"
						>
							<div className="flex flex-row gap-3 items-center">
								<div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
									<Image
										src={testimonial.avatar}
										fill
										alt={`${testimonial.name}'s profile picture`}
										className="object-cover"
									/>
								</div>
								<div>
									<p className="font-sans font-semibold text-[16px] leading-6.2">
										{testimonial.name}
									</p>
									{testimonial.role && (
										<p className="text-sm text-gray-600">{testimonial.role}</p>
									)}
								</div>
							</div>
							<div>
								<p className="font-normal text-[14px] leading-[130%] text-[#121212] text-left">
									{testimonial.testimonial}
								</p>
							</div>
							<div className="flex justify-end">
								{renderStars(testimonial.rating)}
							</div>
						</section>
					))}
				</div>
			</div>
		</div>
	);
};

export default LandingUserSay;