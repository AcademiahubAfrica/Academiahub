import Image from "next/image";
import React from "react";
import {
	AiFillFacebook,
	AiFillInstagram,
	AiFillLinkedin,
	AiOutlineMail,
	AiOutlinePhone,
} from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import Link from "next/link";
import { Input } from "./ui/input";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
	return (
		<footer className="bg-black w-[calc(100%+48px)] -mx-6 px-[39px] pt-[98px] text-white pb-[66px]">
  <section className="flex flex-col gap-20 ">
    
    {/* MAIN FOOTER COLUMNS */}
    <div className="flex flex-wrap gap-[52px] lg:gap-44 w-full justify-center">

      <div className="first-item max-w-[323px]">
        <header className="mb-[127px]">
          <Image
            src={"/assets/images/LandingPage/academiaHub-logo.png"}
            alt="AcademiaHub logo"
            width={158}
            height={45}
          />
          <p className="font-normal text-sm leading-[130%] mt-[25px]">
            Browse the highest-rated projects and papers recommended by
            students and academic supervisors.
          </p>
        </header>

        <div className="flex flex-col gap-[15px]">
          <div className="flex gap-4">
            <AiOutlineMail className="text-white text-[24px]" />
            <p className="font-normal text-sm leading-[130%]">support@Academiahub.com</p>
          </div>
          <div className="flex gap-4">
            <AiOutlinePhone className="text-white text-[24px]" />
            <p className="font-normal text-sm leading-[130%]">+234 (0) 800 123 4567</p>
          </div>
          <div className="flex gap-4">
            <FiMapPin className="text-white text-[24px]" />
            <p className="font-normal text-sm leading-[130%]">Lagos, Nigeria</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-[20px] mb-[25px]">Platform</h3>
        <ul className="flex flex-col gap-5">
          <li><Link className="text-[14px]" href="/">Home</Link></li>
          <li><Link className="text-[14px]" href="/explore">Explore</Link></li>
          <li><Link className="text-[14px]" href="/features">Features</Link></li>
          <li><Link className="text-[14px]" href="/how-it-works">How it works</Link></li>
          <li><Link className="text-[14px]" href="/aboutus">About us</Link></li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-[20px] mb-[25px]">Support</h3>
        <ul className="flex flex-col gap-5">
          <li className="text-[14px]">Help Center</li>
          <li className="text-[14px]">Contact Us</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-[20px] mb-[25px]">Legal & Support</h3>
        <ul className="flex flex-col gap-5">
          <li className="text-[14px]">Terms of Service</li>
          <li className="text-[14px]">Privacy Policy</li>
          <li className="text-[14px]">Cookie Settings</li>
        </ul>
      </div>

      <div className="max-w-[377px]">
        <h3 className="font-bold text-[20px] mb-[25px]">Stay Updated</h3>
        <p className="text-[14px] leading-[130%]">
          Get notified about new features, institutions and academic resources
        </p>
        <Input
          placeholder="Email Address"
          className="bg-white rounded-3xl text-black placeholder:text-black text-[16px] mt-[30px] w-[80%]"
        />
      </div>

    </div>

    {/* DIVIDER */}
  <hr className="border w-full opacity-30 " />

{/* SOCIAL ICONS + COPYRIGHT */}
<div className="w-full flex flex-col items-center gap-4">
  <div className="flex items-center gap-3">
    <Link href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
      <AiFillLinkedin className="text-[26px]" />
    </Link>
    <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
      <AiFillFacebook className="text-[26px]" />
    </Link>
    <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
      <AiFillInstagram className="text-[26px]" />
    </Link>
    <Link href="https://x.com/" target="_blank" rel="noopener noreferrer">
      <FaXTwitter className="text-[26px]" />
    </Link>
  </div>

  <p className="font-normal text-sm text-center mt-1 opacity-80">
    © 2025 AcademiaHubAfrica. All rights reserved.
  </p>
</div>

  </section>
</footer>

	);
};

export default Footer;
