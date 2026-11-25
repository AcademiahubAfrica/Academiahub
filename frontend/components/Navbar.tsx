"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navlinks = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Features", href: "/features" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Team", href: "/team" },
  { name: "About Us", href: "/about-us" },
  { name: "FAQ", href: "/faqs" },
];

const ACTIVE = "bg-linear-to-r from-primary to-[#F8BD00] bg-clip-text text-transparent";

// Desktop (xl+): logo, links, buttons. Tablet: logo, buttons, menu. Phone: logo, menu.
const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();
  const close = () => setOpenMenu(false);

  const links = (className: string) => (
    <ul className={className}>
      {navlinks.map(({ name, href }) => (
        <li key={href}>
          <Link href={href} onClick={close} className={`text-[14px] leading-[130%] whitespace-nowrap ${pathname === href ? ACTIVE : ""}`}>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );

  const buttons = (className: string, sizing = "") => (
    <div className={className}>
      <Button asChild size="lg" className={`font-medium ${sizing}`}>
        <Link href="/signup" onClick={close}>Join for free</Link>
      </Button>
      <Button asChild variant="outline" size="lg" className={`font-medium bg-white border-primary-300 text-gray-900 hover:bg-primary-100 shadow-none ${sizing}`}>
        <Link href="/login" onClick={close}>Log In</Link>
      </Button>
    </div>
  );

  return (
    <nav className="flex relative items-center justify-between bg-white py-5 px-6 container">
      <div className="shrink-0 w-32 md:w-auto [&_img]:w-full [&_img]:h-auto">
        <Logo />
      </div>

      {links("hidden xl:flex items-center gap-6 2xl:gap-8 mx-6")}

      <div className="flex items-center gap-3 lg:gap-4.5">
        {buttons("hidden md:flex items-center gap-3 lg:gap-4.5", "text-sm leading-[130%] h-10 px-6 2xl:w-37.5")}
        <button type="button" aria-label="Open menu" aria-expanded={openMenu} onClick={() => setOpenMenu(true)} className="xl:hidden p-1 -mr-1 cursor-pointer">
          <Menu size={20} strokeWidth={1.5} aria-hidden />
        </button>
      </div>

      {/* Slide-in menu below xl */}
      <div onClick={close} className={`fixed inset-0 bg-black/50 z-40 xl:hidden transition-opacity duration-300 ${openMenu ? "opacity-100" : "opacity-0 pointer-events-none"}`} />
      <div className={`z-50 fixed top-0 right-0 h-full w-60 md:w-64 bg-white xl:hidden flex flex-col transition-transform duration-500 ${openMenu ? "translate-x-0" : "translate-x-full"}`}>
        <button type="button" aria-label="Close menu" onClick={close} className="self-end m-5 p-1 cursor-pointer">
          <X size={20} strokeWidth={1.5} aria-hidden />
        </button>
        {links("flex flex-col gap-8 mt-2 px-6.25")}
        {buttons("md:hidden flex flex-col gap-3 px-6.25 mt-10")}
      </div>
    </nav>
  );
};

export default Navbar;
