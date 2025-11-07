import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const userImg = [
    {
      id: 1,
      imagePath: '/assets/images/users/user-4.png'
    },
    {
      id: 2,
      imagePath: '/assets/images/users/user-3.png'
    },
    {
      id: 3,
      imagePath: '/assets/images/users/user-2.png'
    },
    {
      id: 4,
      imagePath: '/assets/images/users/user-1.png'
    },
  ]
	return (
		<div className="flex  items-center bg-linear-to-b from-[#E9EBF3] to-white bg-zinc-50 font-sans -mx-6 px-6 pt-10">
			{/* Hero Section */}
			<section className="hero-section">
				<div className="hero-text flex flex-col gap-5 w-[282px]">
					{/* Welcome Message */}
					<div className="flex gap-2 rounded-[40px] shadow-[0px_4px_4px] shadow-black/25 px-2 py-[9px] w-[187px] bg-white  h-[34px]">
						<Image
							src={"/assets/images/star-icon.png"}
							alt="star icon"
							width={16}
							height={16}
						/>
						<p className="text-[12px] leading-[130%] bg-[linear-gradient(90deg,#1e3a8a_0%,#f8bd00_15%,#1e3a8a_36%)] bg-clip-text text-transparent">
							Welcome to Academiahub
						</p>
					</div>
          {/* Hero text */}
          <h1 className="text-primary font-semibold text-[36px] leading-[130%]">Access and Share <span className="text-accent-normal">Approved</span> Publications with Ease</h1>
          <h4 className="text-[16px] font-medium leading-[130%]">Discover a vast library of quality academic publications and share your work with the community. </h4>
          {/* Buttons */}
          <div className="buttons flex flex-col gap-[29px]">
            <Link href={'/'}>
              <Button variant="default" size="lg" className="w-[180px] h-14 bg-linear-to-r from-primary to-[#182e6e] shadow-[0_5px_4px] shadow-blue-normal-hover">Start Exploring</Button>
            </Link>
             <Link href={'/'}>
              <Button variant="secondary" size="lg" className="w-[180px] h-14 border border-primary shadow-[0_5px_4px] shadow-[#E9EBF3]">Share Publication</Button>
            </Link>
          </div>
          {/* Images */}
          <div>
             <div className="flex pl-10">
            {
              userImg.map(img => (
                <Image className="-ml-10" key={img.id} src={img.imagePath} alt="users" width={60} height={60} />
              ))
            }
          </div>
           <p className="text-[14px] mt-2.5 leading-[130%] text-primary font-normal">Be part of a Growing Academic Network</p>
          </div>
          {/* STATS */}
          <div className="stats flex gap-2.5 text-center">
            <div>
              <h1 className="font-semibold text-[36px] leading-[130%]">500+</h1>
              <p className="text-[14px] leading-[130%] font-normal">Active Users</p>
            </div>
            <div>
               <h1 className="font-semibold text-[36px] leading-[130%]">1000+</h1>
              <p className="text-[14px] leading-[130%] font-normal">Projects available</p>
            </div>
            <div>
               <h1 className="font-semibold text-[36px] leading-[130%]">100+</h1>
              <p className="text-[14px] leading-[130%] font-normal">Institutions</p>
            </div>
          </div>
				</div>
        <div>
          <Image className="mt-16" src={'/assets/images/hero-img.png'} alt="Hero image" width={336} height={344} />
        </div>
			</section>
		</div>
	);
}
