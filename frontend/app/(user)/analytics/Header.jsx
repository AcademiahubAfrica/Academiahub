"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Header = () => {
  const { data: session } = useSession();

  console.log(session);
  const userName = session?.user.name;
  return (
    <div className="h-25 hidden lg:block mt-5.5 w-full bg-white">
      <h1 className="mb-4 text-2xl text-black">Hi, {userName}</h1>
      <p className="text-grey">
        Browse thousands of student projects and seminar materials from Nigerian
        universities
      </p>
    </div>
  );
};

export default Header;
