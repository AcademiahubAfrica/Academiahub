import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/messaging/utils";
import { getCategoryImage } from "@/lib/categoryImage";
import prisma from "@/prisma/connection";

interface ExploreSectionProps {
	limit?: number;
	showSearch?: boolean;
	showViewAllButton?: boolean;
}

const ExploreSection = async ({
	limit = 12,
	showSearch = true,
	showViewAllButton = true,
}: ExploreSectionProps) => {
	const documents = await prisma.document.findMany({
		include: {
			author: {
				select: { id: true, name: true, image: true },
			},
		},
		orderBy: { createdAt: "desc" },
		take: limit,
	});

	return (
		<section className="flex flex-col items-center min-[1290px]:mt-43.75 p-3">
			<header className="text-center mt-7.5 flex flex-col items-center gap-2">
				<h1 className="max-lg:font-medium max-lg:text-[20px]  leading-[130%] lg:font-bold lg:text-[32px]">
					Explore and Find What You Need
				</h1>
				<h3 className="max-lg:font-medium max-lg:text-sm max-lg:leading-[130%] lg:font-normal lg:text-[24px] mb-5">
					Search through thousands of publications by topic, university or field
					of study
				</h3>
			</header>

			<div>
				<h3 className="font-medium text-xl leading-[130%] mb-5 md:pl-10 lg:pl-0 text-center">
					Suggested publications
				</h3>

				{documents.length === 0 ? (
					<p className="text-center text-gray-500 py-8">No publications found</p>
				) : (
					<div className="publication-list flex max-sm:flex-col sm:flex-row sm:flex-wrap items-center sm:justify-center gap-12.5">
						{documents.map((doc) => (
							<section
								className="max-[1290px]:w-76 min-[1290px]:w-91 py-3 px-2 rounded-lg border-[#D9D9D9] border flex flex-col max-[1290px]:gap-2.5 min-[1290px]:gap-4.5 "
								key={doc.id}
							>
								<Image
									className="rounded-t-[15px] min-[1290px]:w-87"
									src={getCategoryImage(doc.category)}
									width={290}
									height={246}
									alt="Publication image"
								/>
								<div className="flex flex-col gap-2.5 w-74">
									<h4 className="font-medium  max-[1290px]:text-[16px] min-[1290px]:text-[18px] leading-[130%]">
										{doc.title}
									</h4>
									<div className="flex items-center gap-1.5">
										<Avatar className="w-10 h-10 shrink-0">
											<AvatarImage src={doc.author.image || undefined} />
											<AvatarFallback>
												{getInitials(doc.author.name || "")}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="text-sm leading-[130%]">{doc.author.name}</p>
											<p className="text-[#AEAEAE] text-[14px] leading-[130%]">
												{doc.institution}
											</p>
										</div>
									</div>
								</div>
								<Button
									asChild
									variant="default"
									size="lg"
									className="w-full font-medium text-[16px] leading-[130%]"
								>
									<Link href={`/publication/${doc.id}`}>View Details</Link>
								</Button>
							</section>
						))}
					</div>
				)}
			</div>

			{showViewAllButton && (
				<Link href="/explore">
					<Button
						variant={"outline2"}
						size={"lg"}
						className="w-68 border-primary text-primary h-11 font-medium text-[16px] leading-[130%] mt-9"
					>
						Explore full library
					</Button>
				</Link>
			)}
		</section>
	);
};

export default ExploreSection;
