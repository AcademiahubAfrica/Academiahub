import type { ReactNode } from "react";
import { getBanner } from "@/lib/profileBanner";
import { cn } from "@/lib/utils";

// Read-only banner surface, shared by the owner's picker and public profiles.
const ProfileBanner = ({
  bannerKey,
  className,
  children,
}: {
  bannerKey: string | null | undefined;
  className?: string;
  children?: ReactNode;
}) => (
  <div
    className={cn(
      "h-19.25 lg:h-36.25 relative rounded-t-xl overflow-hidden bg-cover bg-center bg-no-repeat",
      className,
    )}
    style={{ backgroundImage: `url(${getBanner(bannerKey).cover})` }}
  >
    {children}
  </div>
);

export default ProfileBanner;
