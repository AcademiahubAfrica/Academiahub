import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/app/_types/messaging";

export type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

interface SocketState {
  socket: TypedSocket | null;
  isConnected: boolean;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

let state: SocketState = { socket: null, isConnected: false };
let connecting = false;
let idleTimer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function setState(partial: Partial<SocketState>) {
  state = { ...state, ...partial };
  notify();
}

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

export async function connect() {
  if (connecting || state.socket?.connected) return;
  connecting = true;

  const token = await fetchToken();
  if (!token) {
    connecting = false;
    return;
  }

  const socket = io(BACKEND_URL, {
    path: "/ws",
    auth: { token },
    transports: ["websocket", "polling"],
  }) as TypedSocket;

  socket.on("connect", () => {
    connecting = false;
    setState({ socket, isConnected: true });
  });

  socket.on("disconnect", () => {
    connecting = false;
    setState({ socket: null, isConnected: false });
  });

  // Store socket immediately so disconnect() can reach it
  state = { ...state, socket };
}

export function disconnect() {
  state.socket?.disconnect();
  connecting = false;
  // State cleanup happens in the "disconnect" event handler
}

export function resetIdleTimer(shouldReconnect: boolean) {
  if (idleTimer) clearTimeout(idleTimer);

  if (shouldReconnect && !state.socket?.connected) {
    connect();
  }

  // Disconnect after 5 min idle
  idleTimer = setTimeout(() => {
    disconnect();
  }, IDLE_TIMEOUT);
}

export function clearIdleTimer() {
  if (idleTimer) {
    clearTimeout(idleTimer);
    idleTimer = null;
  }
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): SocketState {
  return state;
}

const serverState: SocketState = { socket: null, isConnected: false };

export function getServerSnapshot(): SocketState {
  return serverState;
}
