import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Mail } from "lucide-react";

import { FaXTwitter } from "react-icons/fa6";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
const footerLinks = {
  platform: {
    name: "Platform",
    links: [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "Explore",
        href: "/explore",
      },
      {
        title: "Features",
        href: "/features",
      },
      {
        title: "How it works",
        href: "/how-it-works",
      },
      {
        title: "About us",
        href: "/about-us",
      },
    ],
  },
  support: {
    name: "Support",
    links: [
      {
        title: "Help Center",
        href: "/",
      },
      {
        title: "Contact Us",
        href: "/explore",
      },
    ],
  },
  legal: {
    name: "Legal & Support",
    links: [
      {
        title: "Terms of Service",
        href: "/terms-and-conditions",
      },
      {
        title: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        title: "Cookie Policy",
        href: "/cookie-policy",
      },
      {
        title: "Use Policy",
        href: "/use-policy",
      },
    ],
  },
};
const date = new Date();
const currentYear = date.getFullYear();
const Footer = () => {
  return (
    <footer className="bg-black w-full text-white px-4.5 pt-10.25 pb-13.5 md:pt-24.5 md:pb-26.5 md:px-10">
      <div className="flex gap-2 justify-between gap-y-4 lg:gap-4 pb-30 flex-wrap md:pe-6.5  ">
        {/* grid 1 */}
        <div className="-order-2 basis-full md:basis-2/5 lg:basis-1/4">
          <div className="relative w-39.5 h-7.25 mb-6.25">
            <Image
              src={"/assets/images/logo.png"}
              alt="AcademiaHub logo"
              fill
              sizes="158px"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col h-[78%] justify-between ">
            <p className="md:text-base font-normal text-[14px] leading-4.5 md:leading-5 tracking-normal">
              Browse the highest-rated projects and papers recommended by
              students and academic supervisors.
            </p>
            <div className="flex items-center gap-2  ">
              <Mail size={16} strokeWidth={1.5} className="shrink-0" />
              <a
                href="mailto:support@mail.academiahubafrica.org"
                className="text-sm lg:text-base leading-4.5"
              >
                support@mail.academiahubafrica.org
              </a>
            </div>
          </div>
        </div>
        {/* grid 2 */}

        <div className="basis-[47%] max-sm:my-8 md:basis-[27%]  lg:basis-[15%]">
          {/* platform links */}
          <h3 className="font-bold text-xl md:font-medium leading-6  mb-6.25">
            {footerLinks.platform.name}
          </h3>
          <ul className="flex flex-col gap-5">
            {footerLinks.platform.links.map(({ title, href }, index) => (
              <li key={index}>
                <Link
                  className="text-[14px] md:text-base leading-4.5"
                  href={href}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* grid 3 */}

        <div className="basis-[47%] max-sm:my-8 md:basis-[27%]  lg:basis-[15%]">
          {/* legal and support links */}
          <h3 className="font-bold text-xl md:font-medium leading-6  mb-6.25">
            {footerLinks.legal.name}
          </h3>
          <ul className="flex flex-col gap-5">
            {footerLinks.legal.links.map(({ title, href }, index) => (
              <li key={index}>
                <Link
                  className="text-[14px] md:text-base leading-4.5"
                  href={href}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="basis-full lg:basis-1/4">
          <h3 className="font-bold text-xl md:font-medium leading-6  mb-6.25">
            Stay Updated
          </h3>
          <p className="md:text-base font-normal mb-3 text-[14px] leading-4.5 md:leading-5 tracking-normal">
            Get notified about new features, institutions and academic resources
          </p>
          <div className="flex items-center gap-2">
            <Input
              className="pl-4 rounded-2xl w-[70%] "
              placeholder="Ochife@Mustapha.com"
            />
            <Button className="rounded-2xl">Subscribe</Button>
          </div>
        </div>
        <div className="flex items-center gap-2 max-sm:-order-1 basis-full">
          <Mail size={16} strokeWidth={1.5} className="shrink-0" />
          <a
            href="mailto:support@mail.academiahubafrica.org"
            className="text-sm lg:text-base leading-4.5"
          >
            support@mail.academiahubafrica.org
          </a>
        </div>
      </div>
      <Separator className="mb-11.25" />
      {/* icons */}
      <div className="w-full flex flex-col md:flex-row  items-center gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="https://www.linkedin.com/company/academiahub-africa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AcademiaHub on LinkedIn"
          >
            <AiFillLinkedin className="text-[26px]" aria-hidden="true" />
          </Link>
          <Link
            href="https://www.instagram.com/academiahubafrica"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AcademiaHub on Instagram"
          >
            <AiFillInstagram className="text-[26px]" aria-hidden="true" />
          </Link>
          <Link
            href="https://x.com/Academiahub_A"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AcademiaHub on X (Twitter)"
          >
            <FaXTwitter className="text-[26px]" aria-hidden="true" />
          </Link>
        </div>

        <p className="font-normal mx-auto  text-sm text-center mt-1 opacity-80">
          ©{currentYear} AcademiaHubAfrica. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
