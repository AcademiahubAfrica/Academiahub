import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";
import { faqData } from "@/app/data/faqData";
import { AccordionHeader } from "@radix-ui/react-accordion";

const LandingFaq = () => {
	return (
		<div className="mt-10 md:mt-10.5 mb-[125px]">
			<div className="w-full lg:max-w-[1000px]">
				<header className="mb-10 md:mb-15">
					<h1 className="font-medium text-2xl leading-[130%] text-center mt-2 md:mb-4 lg:font-bold lg:text-4xl">
						Frequently Asked Questions
					</h1>
					<h3 className="font-medium text-lg lg:text-2xl lg:font-normal text-center leading-[130%]">
						Find answers to common questions about AcademiaHub
					</h3>
				</header>

				<div className="w-full lg:max-w-[1000px]">
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
								className="rounded-md border md:max-lg:w-3xl lg:w-[1000px] border-gray-400 px-4 py-2"
							>
								<AccordionHeader
									className="w-full flex items-center justify-between py-2 text-left font-semibold text-gray-900 transition-colors duration-200 hover:text-gray-700"
									style={{ fontSize: "clamp(16px, 4vw, 24px)" }}
								>
									<span className="block max-w-[500px] text-2xl">
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
