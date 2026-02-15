import React from "react";
import Link from "next/link";

const ContactSupport = () => {
	return (
		<section className="w-full py-[90px] px-4 sm:px-6 lg:px-[194px]">
			<div className="max-w-[1052px] mx-auto bg-gray-300 rounded-md px-8 py-25 md:px-16 md:py-20 text-center shadow-lg">
				<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
					Still Have Questions?
				</h2>
				<p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
					Our support team is here to help you with any questions or concerns
				</p>
				<Link
					href="/contact"
					className="inline-block bg-white text-blue-900 font-medium text-lg px-16 py-5 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200"
				>
					Contact Support
				</Link>
			</div>
		</section>
	);
};

export default ContactSupport;