"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // List of paths where navbar/footer should be hidden (auth pages)
  const authPages = [
    "/login",
    "/signup",
    "/reset-password",
    "/profile-setup",
    "/verification",
    "/user-registration",
  ];

  // List of user dashboard pages where navbar/footer should be hidden
  const userPages = [
    "/dashboard",
    "/analytics",
    "/downloads",
    "/uploads",
    "/saved",
    "/inbox",
    "/profile",
    "/settings",
  ];

  const isAuthPage = authPages.includes(pathname);
  const isUserPage = userPages.includes(pathname);

  return (
    <>
      {!isAuthPage && !isUserPage && <Navbar />}
      {children}
      <Toaster position="top-right" reverseOrder={false} />
      {!isAuthPage && !isUserPage && <Footer />}
    </>
  );
}
