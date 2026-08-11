"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";

interface ViewDetailsButtonProps {
  documentId: string;
  className?: string;
}

/**
 * "View Details" CTA for publication cards on public pages.
 *
 * /publication/[id] sits under the (user) route group, whose layout bounces
 * signed-out visitors away. Send them to signup instead so the click doesn't
 * dead-end.
 */
const ViewDetailsButton = ({ documentId, className }: ViewDetailsButtonProps) => {
  const { status } = useSession();
  const router = useRouter();

  const handleClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    // Let the browser handle modified clicks (new tab, etc.) and signed-in users.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }
    if (status === "authenticated") return;

    event.preventDefault();

    // Session may still be resolving on first paint — resolve it before deciding,
    // otherwise a signed-in user who clicks early gets sent to signup.
    const session = status === "loading" ? await getSession() : null;
    router.push(session?.user ? `/publication/${documentId}` : "/signup");
  };

  return (
    <Button
      asChild
      variant="default"
      size="lg"
      className={className ?? "w-full font-medium text-[16px] leading-[130%]"}
    >
      <Link
        href={`/publication/${documentId}`}
        onClick={handleClick}
        prefetch={false}
      >
        View Details
      </Link>
    </Button>
  );
};

export default ViewDetailsButton;
