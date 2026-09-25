import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { FaBehance, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import JoinUs from "@/components/landing/JoinUs";

import albertVincent from "./assets/images/albert-uchechukwu-vincent.png";
import akinyemiTitilope from "./assets/images/akinyemi-titilope.png";
import iyandaVictoria from "./assets/images/iyanda-victoria-ibukunoluwa.png";
import mustaphaMustapha from "./assets/images/mustapha-mustapha.png";
import obiemezieEmmanuel from "./assets/images/obiemezie-ikenna-emmanuel.png";
import abayomiAkinruli from "./assets/images/abayomi-akinruli.png";
import babatundeAderinsola from "./assets/images/babatunde-aderinsola.png";
import ikennaEzeani from "./assets/images/ikenna-uchenna-ezeani.png";
import jucalAsitok from "./assets/images/jucal-asitok.png";
import odumuyiwaKaosara from "./assets/images/odumuyiwa-kaosara.png";
import ochifeOgechukwu from "./assets/images/ochife-ogechukwu.png";
import ogunbowaleBarnabas from "./assets/images/ogunbowale--barnabas-olaitan.png";
import olumideFatukesi from "./assets/images/olumide-temitayo-fatukesi.png";
import oluwaseyiOmolehin from "./assets/images/oluwaseyi-daniel-omolehin.png";
import shokanlaFawaz from "./assets/images/shokanla-oladotun-fawaz.png";
import stellaOyewole from "./assets/images/stella-oyewole.png";
import tinyangEnjeck from "./assets/images/tinyang-stacey-enjeck.png";

// The places online where you can find a team member.
type TeamMemberSocials = {
  linkedin?: string;
  x?: string;
  instagram?: string;
  github?: string;
  behance?: string;
  website?: string;
};

// Everything we know about one person on the team.
type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  // Their picture. It can be a picture from our ./assets folder or a web
  // link to a picture. No picture? We show the first letters of their name.
  image?: StaticImageData | string;
  socials: TeamMemberSocials;
};

// This is our list of team members. Each one gets their own card.
// To add someone's link, paste the whole web address between the quotes.
// If the quotes are empty (""), that icon just won't show on their card.
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Albert Uchechukwu Vincent",
    role: "Data Scientist",
    bio: "I helped create AcademiaHub Africa to make learning feel more accessible to everyone with one platform.",
    image: albertVincent,
    socials: {
      linkedin:
        "https://www.linkedin.com/in/uchechukwu-albert-45abb5305?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      x: "",
      instagram: "",
      behance: "",
      website: "",
    },
  },
  {
    id: 2,
    name: "Akinyemi Titilope",
    role: "Product Design Lead",
    bio: "I helped create AcademiaHub Africa to make learning feel more accessible to everyone with one platform.",
    image: akinyemiTitilope,
    socials: {
      linkedin:
        "https://www.linkedin.com/in/titilope-akinyemi-385b26400?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      x: "https://x.com/teee_ui?s=11",
      instagram: "",
      behance: "",
      website: "https://titilopeportfolio.framer.ai/home",
    },
  },
  {
    id: 3,
    name: "Iyanda Victoria Ibukunoluwa",
    role: "Social Media Manager",
    bio: "I helped create AcademiaHub Africa to make learning feel more accessible to everyone with one platform.",
    image: iyandaVictoria,
    socials: {
      linkedin:
        "https://www.linkedin.com/in/victoria-iyanda-98ba293b9?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      x: "https://x.com/iyanda57180",
      instagram:
        "https://www.instagram.com/queenie_vee001?stkn=MXZydmg5ejN0bXFrNw==",
      behance: "",
      website: "",
    },
  },
  {
    id: 4,
    name: "Mustapha Mustapha",
    role: "Project Growth Lead",
    bio: "By merging education and digitalization, we make knowledge accessible and create opportunities for greater impact.",
    image: mustaphaMustapha,
    socials: {
      linkedin: "https://www.linkedin.com/in/mustapha-mustapha-tunde/",
      x: "",
      instagram: "",
      behance: "",
      website: "https://mustaphamustapha.vercel.app/",
    },
  },
  {
    id: 5,
    name: "Odumuyiwa Kaosara Ibukunoluwa",
    role: "Social Media Manager",
    bio: "I helped create AcademiaHub Africa to make learning feel more accessible to everyone with one platform.",
    image: odumuyiwaKaosara,
    socials: {
      linkedin:
        "https://www.linkedin.com/in/kaosara-odumuyiwa-929b19318?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      x: "",
      instagram: "",
      behance: "",
      website: "",
    },
  },
  {
    id: 6,
    name: "Oluwaseyi Daniel Omolehin",
    role: "Cybersecurity, VAPT/DF",
    bio: "When knowledge is shared and opportunities are accessible, everyone has the power to thrive.",
    image: oluwaseyiOmolehin,
    socials: {
      linkedin:
        "https://www.linkedin.com/in/oluwaseyi-omolehin-0229a61a3?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      x: "https://x.com/kvng_bidex?s=11",
      instagram: "",
      behance: "",
      website: "",
    },
  },
  {
    id: 7,
    name: "Stella Oyewole",
    role: "Product Manager",
    bio: "I joined Academia Hub because I believe where you come from shouldn't limit how far your knowledge can take you.",
    image: stellaOyewole,
    socials: {
      linkedin:
        "https://www.linkedin.com/in/stella-oyewole-359627302?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      x: "",
      instagram: "",
      behance: "",
      website: "",
    },
  },
  {
    id: 8,
    name: "Babatunde Aderinsola",
    role: "Security Engineer, Cybersecurity Lead",
    bio: "Making Africans value academic research through education, because research drives development. Your course project matters.",
    image: babatundeAderinsola,
    socials: {
      linkedin: "https://www.linkedin.com/in/aderinsola-babatunde-84a6a4294",
      x: "",
      instagram:
        "https://www.instagram.com/derinssolla?stkn=MTgyYXIzOGlqZnIxNA%3D%3D&utm_source=qr",
      behance: "",
      website: "",
    },
  },
  {
    id: 9,
    name: "Obiemezie Ikenna Emmanuel",
    role: "Data Analyst",
    bio: "I joined AcademiaHub Africa to bridge academic gaps and amplify African research.",
    image: obiemezieEmmanuel,
    socials: {
      linkedin:
        "https://www.linkedin.com/in/ikenna-obiemezie-68571619b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      x: "https://x.com/NuelObiemezie",
      instagram: "",
      behance: "",
      website: "",
    },
  },
  {
    id: 10,
    name: "Ogunbowale Barnabas Olaitan",
    role: "Product Manager, Project & Operations Lead",
    bio: "Nothing better than team work, AcademiaHub wants your masterpiece to be seen.",
    image: ogunbowaleBarnabas,
    socials: {
      linkedin: "https://www.linkedin.com/in/barnabas-ogunbowale-6938252ab",
      x: "",
      instagram: "",
      behance: "",
      website: "",
    },
  },
  {
    id: 11,
    name: "Olumide Temitayo Fatukesi",
    role: "Cybersecurity, Compliance Lead",
    bio: "I believe in doing things right, building trust, and creating systems that protect people and empower progress.",
    image: olumideFatukesi,
    socials: {
      linkedin: "https://www.linkedin.com/in/fatukesi-olumide",
      x: "https://x.com/comp_guyy?s=11",
      instagram: "",
      behance: "",
      website: "",
    },
  },
  {
    id: 12,
    name: "Ochife Ogechukwu",
    role: "Finance Lead, Front-end Dev",
    bio: "Africa has the minds. We're building the connections.",
    image: ochifeOgechukwu,
    socials: {
      linkedin: "https://www.linkedin.com/in/ogechukwu-ochife-88443a284",
      x: "https://x.com/Tactical_God",
      instagram: "",
      behance: "",
      website: "https://buildwithochife.vercel.app",
    },
  },
  {
    id: 13,
    name: "Shokanla Oladotun Fawaz",
    role: "Product Designer",
    bio: "I believe in turning ideas into meaningful experiences that connect people, knowledge, and opportunity.",
    image: shokanlaFawaz,
    socials: {
      linkedin:
        "https://www.linkedin.com/in/oladotun-shokanla-48a98b316?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      x: "https://x.com/oladotun_x?s=11&t=SSsVYx5kb-feZOSLwFhaHQ",
      instagram: "",
      behance: "https://www.behance.net/oladotushokanl",
      website: "",
    },
  },
  {
    id: 14,
    name: "Jucal Asitok",
    role: "Product Lead, Engineering Lead",
    bio: "Progress runs on research. Every breakthrough starts with research. I'm proud to build the portal, making it accessible here at AcademiaHub Africa.",
    image: jucalAsitok,
    socials: {
      linkedin: "https://www.linkedin.com/in/jucal-asitok",
      x: "https://x.com/jucalasitok",
      instagram: "",
      behance: "",
      website: "",
    },
  },
  {
    id: 15,
    name: "Odumuyiwa Kaosara Ibukunoluwa",
    role: "Data Analyst",
    bio: "When Africa builds together, knowledge stays home and grows the continent.",
    image: odumuyiwaKaosara,
    socials: {
      linkedin: " https://www.linkedin.com/in/kaosara-odumuyiwa-929b19318?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      x: "",
      instagram: "",
      behance: "",
      website: "",
    },
  },
  {
    id: 16,
    name: "Ikenna Uchenna Ezeani",
    role: "Data Analyst",
    bio: "Your brainchild is too groundbreaking to not share with the rest of the world. Don't rob us of the opportunity of witnessing your brilliance.",
    image: ikennaEzeani,
    socials: {
      linkedin:
        "https://www.linkedin.com/in/ikenna-ezeani-670b00190?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      x: "",
      instagram: "",
      behance: "",
      website: "",
    },
  },
  {
    id: 17,
    name: "Abayomi Akinruli",
    role: "Front-end Dev",
    bio: "I joined AcademiaHub Africa to make knowledge more accessible, connected, and visible across Africa.",
    image: abayomiAkinruli,
    socials: {
      linkedin:
        "https://www.linkedin.com/in/abayomi-akinruli-98a190213?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      x: "",
      instagram: "",
      behance: "",
      website: "",
    },
  },
  {
    id: 18,
    name: "Tinyang Stacey Enjeck",
    role: "Compliance Officer",
    bio: "I joined AcademiaHub partly because GRC isn't a fully integrated function across the education sector in general. Being part of that, in a compliance role, felt just right.",
    image: tinyangEnjeck,
    socials: {
      linkedin: "https://www.linkedin.com/in/stacey-tinyang",
      x: "https://x.com/JustEnjeck_",
      instagram: "https://www.instagram.com/stacey_in_grc",
      behance: "",
      website: "",
    },
  },
];

// Which little picture (icon) and name to use for each kind of link.
const socialIcons: Record<
  keyof TeamMemberSocials,
  { icon: IconType; label: string }
> = {
  linkedin: { icon: AiFillLinkedin, label: "LinkedIn" },
  x: { icon: FaXTwitter, label: "X (Twitter)" },
  instagram: { icon: AiFillInstagram, label: "Instagram" },
  github: { icon: AiFillGithub, label: "GitHub" },
  behance: { icon: FaBehance, label: "Behance" },
  website: { icon: Globe, label: "Website" },
};

// Takes the first letter of the first two names.
// "Jucal Asitok" becomes "JA".
const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

// One card for one person: their picture, name, job, a few words about
// them, and their links at the bottom.
const TeamCard = ({ member }: { member: TeamMember }) => {
  // Keep only the links that are filled in, so we don't show empty icons.
  const socials = (
    Object.entries(member.socials) as [keyof TeamMemberSocials, string][]
  ).filter(([, url]) => Boolean(url));

  return (
    <article className="relative aspect-344/488 overflow-hidden rounded-md bg-primary-100 shadow-sm">
      {member.image ? (
        <Image
          src={member.image}
          alt={`Photo of ${member.name}`}
          fill
          sizes="(min-width: 1280px) 344px, (min-width: 1024px) 240px, (min-width: 768px) 33vw, 50vw"
          className="object-cover object-top"
        />
      ) : (
        // No picture, so we show their letters on a colored background.
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-start justify-center bg-linear-to-b from-primary-300 to-primary-600 pt-[18%] text-3xl font-semibold text-white md:text-4xl"
        >
          {getInitials(member.name)}
        </div>
      )}

      <div className="absolute inset-x-1.5 bottom-1.5 flex h-[42%] flex-col gap-1 overflow-hidden rounded-md bg-white p-2 shadow-md md:inset-x-2 md:bottom-2 md:gap-2 md:p-3 xl:inset-x-4 xl:bottom-4 xl:h-[190px] xl:gap-4 xl:rounded-xl xl:px-6 xl:py-4">
        {/* This is the white box on top of the picture. On big screens it is
            always 190px tall, like the design. On smaller screens it grows
            and shrinks with the card. The links always sit at the bottom. */}
        <div>
          <h3 className="line-clamp-2 text-[11px] font-semibold leading-tight text-gray-900 md:text-sm">
            {member.name}
          </h3>
          <p className="mt-0.5 line-clamp-2 text-[9px] font-semibold leading-tight text-primary md:text-xs">
            {member.role}
          </p>
        </div>
        <p className="line-clamp-4 text-[9px] leading-snug text-gray-600 md:text-xs">
          {member.bio}
        </p>
        <div className="mt-auto flex w-full shrink-0 items-center gap-2 xl:h-6 xl:gap-3">
          {socials.map(([key, url]) => {
            const { icon: Icon, label } = socialIcons[key];
            return (
              <Link
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on ${label}`}
                className="text-gray-500 transition-colors hover:text-primary"
              >
                <Icon
                  className="size-3 md:size-4 xl:size-6"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </article>
  );
};

// The whole page: a title at the top, then everyone's cards in a grid.
const MeetTheTeam = () => {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-primary-100 px-6 py-10 md:py-14 lg:py-16">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-lg font-semibold leading-[130%] text-gray-900 md:text-2xl lg:text-3xl">
            Meet the team building the future of African academia
          </h1>
          <p className="mt-2 text-sm leading-[130%] text-gray-500 md:text-base lg:text-lg">
            Something short about the people working to make learning, teaching,
            and academic resources more accessible.
          </p>
        </header>
      </section>

      <section
        aria-label="Team members"
        className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12 lg:py-14 xl:max-w-[1472px]"
      >
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 xl:gap-4">
          {teamMembers.map((member) => (
            <li key={member.id}>
              <TeamCard member={member} />
            </li>
          ))}
        </ul>
      </section>

      <JoinUs />
    </main>
  );
};

export default MeetTheTeam;
