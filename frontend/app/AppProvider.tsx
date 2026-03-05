"use client";
// this component is ment to be house all contexts and provided to root layout once

import SavedProvider from "./_contexts/SavedContext";
import QueryProvider from "./_contexts/QueryProvider";
import { SocketProvider } from "./_contexts/SocketContext";
import { PresenceProvider } from "./_contexts/PresenceContext";
import NextAuthProvider from "@/utils/providers/NextAuthProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextAuthProvider>
        <QueryProvider>
          <SocketProvider>
            <PresenceProvider>
              <SavedProvider>{children}</SavedProvider>
            </PresenceProvider>
          </SocketProvider>
        </QueryProvider>
      </NextAuthProvider>
    </>
  );
};

export default AppProvider;
