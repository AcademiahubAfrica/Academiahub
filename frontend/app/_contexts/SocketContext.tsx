"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import type { TypedSocket } from "@/lib/messaging/socketManager";
import {
  connect,
  disconnect,
  resetIdleTimer,
  clearIdleTimer,
  subscribe,
  getSnapshot,
  getServerSnapshot,
} from "@/lib/messaging/socketManager";

interface SocketContextType {
  socket: TypedSocket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  const { socket, isConnected } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Connect/disconnect based on auth status
  useEffect(() => {
    if (status === "authenticated") {
      connect();
    } else if (status === "unauthenticated") {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [status]);

  // Set up idle timeout listeners
  useEffect(() => {
    if (status !== "authenticated") return;

    const onActivity = () => resetIdleTimer(true);
    const events = ["mousemove", "keydown", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, onActivity));
    resetIdleTimer(false);

    return () => {
      events.forEach((e) => window.removeEventListener(e, onActivity));
      clearIdleTimer();
    };
  }, [status]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export function useSocket() {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocket must be used inside <SocketProvider>");
  return ctx;
}
