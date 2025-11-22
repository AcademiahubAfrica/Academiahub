import Image from "next/image";
import React from "react";
import { userSay } from "../data/userSay";

const LandingUserSay = () => {
	return (
		<div className="mb-[194px] mt-[39px] ">
			<div>
				<header className="mb-[101px]">
					<h1 className="font-medium text-[#171717] text-[24px] leading-[130%] text-center mb-4 lg:font-bold lg:text-[32px] lg:leading-[100%] ">
						What Our Users Say
					</h1>
					<h3 className="font-medium text-[#171717] text-[18px] leading-[130%] text-center lg:font-normal lg:text-[24px] lg:leading-[100%]  ">
						Hear from students, researchers, and educators who use AcademiaHub
						every day
					</h3>
				</header>

        <div className="flex flex-wrap gap-[82px] sm:gap-[17px] justify-center">
          {
          userSay.map(u => (
             <section key={u.id} className="flex flex-col gap-4 border border-[#D9D9D9] w-[328px] md:w-[426px] lg:w-[433px] rounded-[12px] p-6">
           <div className="flex flex-row gap-[11px] items-center">
            <Image src={'/assets/images/LandingPage/users/user-3.png'} width={40} height={40} alt="a user's profile picture" />
            <p className="font-sans font-semibold text-[16px] leading-[25px] ">{u.name}</p>
           </div>
           <div>
            <p className="font-normal text-[14px] leading-[130%] text-[#121212] text-left">{u.text}</p>
           </div>
           <div className="flex justify-end">
            <Image src={'/assets/images/LandingPage/review-stars.png'} alt="Stars review" width={100} height={100} />
           </div>
        </section>
          ))
         }
        </div>

         

       
			</div>
		</div>
	);
};

export default LandingUserSay;
