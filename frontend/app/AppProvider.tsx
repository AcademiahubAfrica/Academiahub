"use client";
// this component is ment to be house all contexts and provided to root layout once

import SavedProvider from "./_contexts/SavedContext";
import NextAuthProvider from "@/utils/providers/NextAuthProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextAuthProvider>
        <SavedProvider>{children}</SavedProvider>
      </NextAuthProvider>
    </>
  );
};

export default AppProvider;
