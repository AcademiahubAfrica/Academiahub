"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/app/_types/messaging";

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

interface SocketContextType {
  socket: TypedSocket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | null>(null);

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

async function fetchToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/token");
    if (!res.ok) return null;
    const data = await res.json();
    return data.token ?? null;
  } catch {
    return null;
  }
}

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  const socketRef = useRef<TypedSocket | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(async () => {
    if (socketRef.current?.connected) return;

    const token = await fetchToken();
    if (!token) return;

    const socket = io(BACKEND_URL, {
      path: "/ws",
      auth: { token },
      transports: ["websocket", "polling"],
    }) as TypedSocket;

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    socketRef.current = socket;
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
  }, []);

  // Reset idle timer on user activity
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    // If disconnected due to idle, reconnect
    if (!socketRef.current?.connected && status === "authenticated") {
      connect();
    }

    // STRIDE #8: Disconnect after 5 min idle
    idleTimerRef.current = setTimeout(() => {
      disconnect();
    }, IDLE_TIMEOUT);
  }, [connect, disconnect, status]);

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
  }, [status, connect, disconnect]);

  // Set up idle timeout listeners
  useEffect(() => {
    if (status !== "authenticated") return;

    const events = ["mousemove", "keydown", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetIdleTimer));
    resetIdleTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetIdleTimer));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [status, resetIdleTimer]);

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current, isConnected }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export function useSocket() {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocket must be used inside <SocketProvider>");
  return ctx;
}
