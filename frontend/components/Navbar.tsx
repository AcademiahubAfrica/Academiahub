"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navlinks = [
    {
      id: 1,
      name: "Home",
      href: "/",
    },
    {
      id: 2,
      name: "Explore",
      href: "/explore",
    },
    {
      id: 3,
      name: "Features",
      href: "/features",
    },
    {
      id: 4,
      name: "How it works",
      href: "/how-it-works",
    },
    {
      id: 5,
      name: "Testimonials",
      href: "/testimonials",
    },
    {
      id: 6,
      name: "About us",
      href: "/aboutus",
    },
    {
      id: 7,
      name: "FAQs",
      href: "/faqs",
    },
  ];
  const pathname = usePathname();

  return (
    <nav className="flex relative items-center justify-between bg-white py-5 px-6">
      <div className="right flex items-center gap-7">
        {/* Menu Button */}
        <FaBars
          onClick={() => setOpenMenu(true)}
          className="text-[18px] min-[1140px]:hidden cursor-pointer"
        />
        {/* Logo - Updated path to match your auth pages */}
        <Image
          src={"/assets/images/logo.png"}
          alt="AcademiaHub logo"
          width={158}
          height={45}
        />
      </div>

      {/* Nav Links */}
      <ul className="hidden min-[1140px]:flex gap-[30px] ">
        {navlinks.map((link) => (
          <li key={link.id}>
            <Link
              className={`text-[14px] leading-[130%] ${
                pathname === link.href &&
                "bg-gradient-to-r from-primary to-[#F8BD00] bg-clip-text text-transparent"
              }`}
              href={link.href}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA Buttons  */}
      <div className="buttons hidden md:flex items-center gap-[18px]">
        <Link href={"/signup"}>
          <Button
            variant="default"
            size="lg"
            className="font-normal cursor-pointer text-[14px] leading-[130%] w-[150px]"
          >
            Join for free
          </Button>
        </Link>
        <Link href={"/login"}>
          <Button
            variant="secondary"
            size="lg"
            className="font-medium cursor-pointer border border-primary text-[16px] leading-[130%] w-[150px]"
          >
            Log in
          </Button>
        </Link>
      </div>

      {/* SIDE NAV Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 min-[1140px]:hidden transition-opacity duration-300 ${
          openMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenMenu(false)}
      />

      {/* SIDE NAV Menu */}
      <div
        className={`z-50 side-nav top-0 bg-white fixed h-full left-0 min-[1140px]:hidden max-md:w-[220px] md:w-60 flex ${
          openMenu ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-700`}
      >
        <ul className="flex flex-col gap-10 mt-11 ml-[25px]">
          {navlinks.map((link) => (
            <li key={link.id}>
              <Link
                className={`text-[14px] leading-[130%] ${
                  pathname === link.href &&
                  "bg-gradient-to-r from-primary to-[#F8BD00] bg-clip-text text-transparent"
                }`}
                onClick={() => setOpenMenu(false)}
                href={link.href}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
