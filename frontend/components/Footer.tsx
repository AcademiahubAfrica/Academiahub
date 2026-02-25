import Image from "next/image";
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
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <footer className="bg-black w-full text-white">
      <div className="px-6 lg:px-9 pt-25 pb-17">
        <section className="flex flex-col gap-20">
          {/* MAIN FOOTER COLUMNS */}
          <div className="grid grid-cols-1 max-sm:justify-center sm:grid-cols-2 lg:grid-cols-3 lg:space-y-2 flex-wrap gap-13 lg:space-x-48 w-full ">
            <div className="first-item max-w-81">
              <header className="mb-16">
                <Image
                  src={"/assets/images/logo-white.png"}
                  alt="AcademiaHub logo"
                  width={180}
                  height={50}
                />
                <p className="font-normal text-sm leading-[130%] mt-6.25">
                  Browse the highest-rated projects and papers recommended by
                  students and academic supervisors.
                </p>
              </header>

              <div className="flex flex-col gap-3.75">
                <div className="flex gap-4">
                  <AiOutlineMail className="text-white text-[24px]" />
                  <p className="font-normal text-sm leading-[130%]">
                    support@Academiahub.com
                  </p>
                </div>
                <div className="flex gap-4">
                  <AiOutlinePhone className="text-white text-[24px]" />
                  <p className="font-normal text-sm leading-[130%]">
                    +234 (0) 800 123 4567
                  </p>
                </div>
                <div className="flex gap-4">
                  <FiMapPin className="text-white text-[24px]" />
                  <p className="font-normal text-sm leading-[130%]">
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[20px] mb-6.25">Platform</h3>
              <ul className="flex flex-col gap-5">
                <li>
                  <Link className="text-[14px]" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="text-[14px]" href="/explore">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link className="text-[14px]" href="/features">
                    Features
                  </Link>
                </li>
                <li>
                  <Link className="text-[14px]" href="/how-it-works">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link className="text-[14px]" href="/about-us">
                    About us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[20px] mb-6.25">Support</h3>
              <ul className="flex flex-col gap-5">
                <li className="text-[14px]">Help Center</li>
                <li className="text-[14px]">Contact Us</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[20px] mb-6.25">Legal & Support</h3>
              <ul className="flex flex-col gap-5">
                <li className="text-[14px]">Terms of Service</li>
                <li className="text-[14px]">Privacy Policy</li>
                <li className="text-[14px]">Cookie Settings</li>
              </ul>
            </div>

            <div className="max-w-94">
              <h3 className="font-bold text-[20px] mb-6.25">Stay Updated</h3>
              <p className="text-[14px] leading-[130%]">
                Get notified about new features, institutions and academic
                resources
              </p>
              <Input
                placeholder="Email Address"
                className="bg-white rounded-3xl text-black placeholder:text-black text-[16px] mt-7.5 w-[80%]"
              />
            </div>
          </div>

          {/* DIVIDER */}
          <hr className="border w-full opacity-30" />

          {/* SOCIAL ICONS + COPYRIGHT */}
          <div className="w-full flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillLinkedin className="text-[26px]" />
              </Link>
              <Link
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillFacebook className="text-[26px]" />
              </Link>
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillInstagram className="text-[26px]" />
              </Link>
              <Link
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="text-[26px]" />
              </Link>
            </div>

            <p className="font-normal text-sm text-center mt-1 opacity-80">
              ©{currentYear} AcademiaHubAfrica. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
