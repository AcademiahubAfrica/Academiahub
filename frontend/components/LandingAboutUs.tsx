import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const LandingAboutUs = () => {
	return (
		<div className="bg-[#E9EBF3] w-[calc(100%+48px)] relative ">
			<div className="px-6 lg:mb-[62px]">
				<header className="mt-[33px] mb-[35px]">
					<h1 className="font-medium text-2xl lg:text-[32px] leading-[130%] text-center mb-4">
						About Us
					</h1>
					<h3 className="font-medium text-lg lg:text-2xl leading-[130%] text-center">
						Built by Students for Students
					</h3>
				</header>
				<div className="lg:flex gap-[165px] items-center justify-center">
					<div className="flex flex-col gap-5 mb-[27px] lg:w-[641px]">
						<p className="font-normal text-sm leading-[130%]">
							We are on a mission to make research easier, smarter and more
							rewarding. Our Platform connects academics across various
							institutions of learning and by providing access to approved
							projects and write-ups while giving you the opportunity to earn by
							sharing your work and inspiring the future.
						</p>
						<ul>
							<li className="flex items-center gap-1.5">
								<Image
									src={"/assets/images/LandingPage/checked-icon.png"}
									alt="check-icon"
									width={24}
									height={24}
								/>{" "}
								<p className="font-normal text-sm leading-[130%]">
									Peer-reviewed content
								</p>
							</li>
							<li className="flex items-center gap-1.5">
								<Image
									src={"/assets/images/LandingPage/checked-icon.png"}
									alt="check-icon"
									width={24}
									height={24}
								/>{" "}
								<p className="font-normal text-sm leading-[130%]">
									Global academic network
								</p>
							</li>
							<li className="flex items-center gap-1.5">
								<Image
									src={"/assets/images/LandingPage/checked-icon.png"}
									alt="check-icon"
									width={24}
									height={24}
								/>{" "}
								<p className="font-normal text-sm leading-[130%]">
									Secure and reliable platform
								</p>
							</li>
							<li className="flex items-center gap-1.5">
								<Image
									src={"/assets/images/LandingPage/checked-icon.png"}
									alt="check-icon"
									width={24}
									height={24}
								/>{" "}
								<p className="font-normal text-sm leading-[130%]">
									Free access to resources
								</p>
							</li>
						</ul>

						<Button variant={"default"} size={"lg"} className="w-[272px]">
							Learn More
						</Button>
					</div>
					<picture>
						<source
							media="(min-width:768px )"
							className="w-[865px] h-[367px]"
							srcSet="/assets/images/LandingPage/tablet-about-img.png"
						/>
						<Image
							className="sm:w-full md:max-lg:mt-[195px]"
							src={"/assets/images/LandingPage/about-img.png"}
							alt="A man and woman laughing in fron of their Educational Instituition"
							width={327}
							height={196}
						/>
					</picture>
				</div>
			</div>
		</div>
	);
};

export default LandingAboutUs;
