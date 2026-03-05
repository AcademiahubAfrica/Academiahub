"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSocket } from "./SocketContext";
import type { PresencePayload, PresenceSyncPayload } from "@/app/_types/messaging";

const PresenceContext = createContext<Set<string>>(new Set());

export const PresenceProvider = ({ children }: { children: ReactNode }) => {
  const { socket } = useSocket();
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!socket) return;

    const onPresenceSync = (payload: PresenceSyncPayload) => {
      setOnlineUsers(new Set(payload.onlineUserIds));
    };

    const onPresence = (payload: PresencePayload) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        if (payload.status === "online") {
          next.add(payload.userId);
        } else {
          next.delete(payload.userId);
        }
        return next;
      });
    };

    socket.on("presence:sync", onPresenceSync);
    socket.on("presence", onPresence);

    // Request initial sync after listeners are attached
    if (socket.connected) {
      socket.emit("presence:request");
    } else {
      socket.once("connect", () => socket.emit("presence:request"));
    }

    return () => {
      socket.off("presence:sync", onPresenceSync);
      socket.off("presence", onPresence);
    };
  }, [socket]);

  return (
    <PresenceContext.Provider value={onlineUsers}>
      {children}
    </PresenceContext.Provider>
  );
};

export function usePresence() {
  return useContext(PresenceContext);
}
