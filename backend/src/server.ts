/* Must stay first. It loads the environment and starts Sentry before anything
   else is required, so nothing that happens during startup goes unrecorded. */
import { Sentry } from "./instrument";

import http from "http";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import "./types";
import conversationRoutes from "./routes/conversations";
import messageRoutes from "./routes/messages";
import userRoutes from "./routes/users";
import internalRoutes from "./routes/internal";
import { errorHandler } from "./middleware/errorHandler";
import { createSocketServer } from "./ws/handler";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(",").map((u) => u.trim())
      : "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));

// ─── REST Routes ────────────────────────────────────────

app.use("/api/conversations", conversationRoutes);
app.use("/api/conversations", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/internal", internalRoutes);

// ─── Health Check ───────────────────────────────────────

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

// ─── HTTP + Socket.IO Server ────────────────────────────

const server = http.createServer(app);
createSocketServer(server);

const PORT = parseInt(process.env.PORT || "4000", 10);

server.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

/**
 * Sentry batches log events for a few seconds before sending them, and a
 * stopped process takes that buffer with it. This host stops idle instances
 * routinely, so the events most likely to be lost are the last ones before a
 * shutdown — which, if something was happening, are the ones that mattered.
 */
async function shutdown(): Promise<void> {
  server.close();
  await Sentry.flush(2000);
  process.exit(0);
}

process.on("SIGTERM", () => void shutdown());
process.on("SIGINT", () => void shutdown());
