import { getInitials } from "@/lib/messaging/utils";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { Globe } from "lucide-react";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { FaBehance, FaXTwitter } from "react-icons/fa6";

type TeamMemberSocials = {
  linkedin?: string;
  x?: string;
  instagram?: string;
  github?: string;
  behance?: string;
  website?: string;
};

// Icon links
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

type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  image?: StaticImageData | string;
  socials: TeamMemberSocials;
};

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
        // No picture. Shows their letters on a colored background.
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-start justify-center bg-linear-to-b from-primary-300 to-primary-600 pt-[18%] text-3xl font-semibold text-white md:text-4xl"
        >
          {getInitials(member.name)}
        </div>
      )}

      <div className="absolute inset-x-1.5 bottom-1.5 flex h-[42%] flex-col gap-1 overflow-hidden rounded-md bg-white p-2 shadow-md md:inset-x-2 md:bottom-2 md:gap-2 md:p-3 xl:inset-x-4 xl:bottom-4 xl:h-[190px] xl:gap-4 xl:rounded-xl xl:px-6 xl:py-4">
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

export default TeamCard;
