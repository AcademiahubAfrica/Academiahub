import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";

import { faqData } from "@/app/data/faqData";
import { AccordionHeader } from "@radix-ui/react-accordion";

interface LandingFaqProps {
	hideHeader?: boolean;
}

const LandingFaq = ({ hideHeader }: LandingFaqProps) => {
	return (
		<div className="mt-10 md:mt-10.5 mb-8.25 flex justify-center">
			<div className="w-full lg:max-w-250">
				{!hideHeader && (
					<header className="mb-4 md:mb-15">
						<h1 className="font-medium text-xl leading-[130%] text-center mt-2 md:mb-4 lg:font-bold lg:text-4xl">
							Frequently Asked Questions
						</h1>
						<h3 className="font-medium text-sm lg:text-2xl lg:font-normal text-center leading-[130%]">
							Find answers to common questions about AcademiaHub
						</h3>
					</header>
				)}

				<div className="w-[90%] max-md:mx-auto lg:max-w-250">
					<Accordion
						type="single"
						collapsible
						className="w-full space-y-4"
						defaultValue={`item-0`}
					>
						{faqData.map((faq, index) => (
							<AccordionItem
								key={index}
								value={`item-${index}`}
								className="rounded-md border md:max-lg:w-2xl lg:w-250 border-gray-400 px-4 py-2"
							>
								<AccordionHeader
									className="w-full text-sm flex items-center h-8 justify-between py-2 md:py-5 text-left font-semibold text-gray-900 transition-colors duration-200 hover:text-gray-700"
									style={{ fontSize: "clamp(14px, 4vw, 24px)" }}
								>
									<span className="block max-w-200 text-base sm:text-xl">
										{faq.question}
									</span>
									<AccordionTrigger />
								</AccordionHeader>

								<AccordionContent className="flex flex-col gap-4">
									<div
										className="mt-2 leading-relaxed text-[#2d2d2d]"
										style={{ fontSize: "clamp(16px, 4vw, 18px)" }}
									>
										{faq.answer}
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	);
};

export default LandingFaq;
