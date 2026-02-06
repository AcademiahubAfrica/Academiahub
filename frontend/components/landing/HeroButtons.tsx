"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroButtons = () => {
	const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

	const handleResize = () => {
		setWindowWidth(window.innerWidth);
	};
	useEffect(() => {
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	if (windowWidth && windowWidth < 768) {
		return (
			<div className="buttons flex max-sm:flex-col gap-2 ">
				<Link href={"/signup"}>
					<Button
						variant="default"
						size="lg"
						className="w-full h-11 bg-linear-to-r from-primary "
					>
						Join for Free
					</Button>
				</Link>
				<Link href={"/login"}>
					<Button
						variant="secondary"
						size="lg"
						className="w-full h-11 border border-primary shadow-[0_5px_4px] shadow-[#E9EBF3]"
					>
						Log in
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="buttons flex max-sm:flex-col gap-2 ">
			<Link href={"/explore"}>
				<Button
					variant="default"
					size="lg"
					className="w-full h-11 bg-linear-to-r from-primary "
				>
					Start Exploring
				</Button>
			</Link>
			<Link href={"/dashboard"}>
				<Button
					variant="secondary"
					size="lg"
					className="w-full h-11 border border-primary shadow-[0_5px_4px] shadow-[#E9EBF3]"
				>
					Share Publication
				</Button>
			</Link>
		</div>
	);
};

export default HeroButtons;
