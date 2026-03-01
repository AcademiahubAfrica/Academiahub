import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { verifyToken } from "../middleware/verifySession";
import { addSocket, removeSocket, isUserOnline, broadcastPresence } from "./connections";
import { handleMessageSend, handleReadMark, handleTyping } from "./events";
import { MessageSendPayload, ReadMarkPayload, TypingPayload } from "../types";

export function createSocketServer(httpServer: HttpServer): Server {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL
        ? process.env.FRONTEND_URL.split(",").map((u) => u.trim())
        : "http://localhost:3000",
      credentials: true,
    },
    path: "/ws",
  });

  // Authenticate on connection via handshake auth token
  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token as string | undefined;

    if (!token) {
      return next(new Error("Authentication required"));
    }

    const userId = await verifyToken(token);

    if (!userId) {
      return next(new Error("Invalid or expired token"));
    }

    socket.data.userId = userId;
    next();
  });

  io.on("connection", (socket: Socket) => {
    const userId = socket.data.userId as string;

    // Enforce max connections per user
    if (!addSocket(userId, socket)) {
      socket.emit("error", { message: "Too many connections" });
      socket.disconnect(true);
      return;
    }

    broadcastPresence(userId, "online");

    // ─── Event Listeners ──────────────────────────────

    socket.on("message:send", (payload: MessageSendPayload) => {
      handleMessageSend(socket, userId, payload);
    });

    socket.on("read:mark", (payload: ReadMarkPayload) => {
      handleReadMark(socket, userId, payload);
    });

    socket.on("typing:start", (payload: TypingPayload) => {
      handleTyping(socket, userId, payload, true);
    });

    socket.on("typing:stop", (payload: TypingPayload) => {
      handleTyping(socket, userId, payload, false);
    });

    socket.on("disconnect", () => {
      const disconnectedUserId = removeSocket(socket);

      if (disconnectedUserId && !isUserOnline(disconnectedUserId)) {
        broadcastPresence(disconnectedUserId, "offline");
      }
    });
  });

  return io;
}
