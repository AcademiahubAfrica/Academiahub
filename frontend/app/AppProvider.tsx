"use client";
// this component is ment to be house all contexts and provided to root layout once

import SavedProvider from "./_contexts/SavedContext";
import QueryProvider from "./_contexts/QueryProvider";
import { SocketProvider } from "./_contexts/SocketContext";
import NextAuthProvider from "@/utils/providers/NextAuthProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextAuthProvider>
        <QueryProvider>
          <SocketProvider>
            <SavedProvider>{children}</SavedProvider>
          </SocketProvider>
        </QueryProvider>
      </NextAuthProvider>
    </>
  );
};

export default AppProvider;
