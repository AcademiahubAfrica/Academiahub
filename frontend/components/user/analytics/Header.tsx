"use client";
import NameSkeleton from "@/components/NameSkeleton";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  const userName = session?.user.name;
  return (
    <div className="h-25  p-4 rounded-[20px]  mb-2! hidden lg:block mt-5  bg-white">
      <h1 className="mb-4 flex text-2xl text-black">
        Hi, {status === "loading" ? <NameSkeleton /> : userName}
      </h1>

      <p className="text-grey">
        Browse thousands of student projects and seminar materials from Nigerian
        universities
      </p>
    </div>
  );
};

export default Header;
