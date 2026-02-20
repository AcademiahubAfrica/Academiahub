import dotenv from "dotenv";
dotenv.config();

import http from "http";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import "./types";
import conversationRoutes from "./routes/conversations";
import messageRoutes from "./routes/messages";
import userRoutes from "./routes/users";
import { errorHandler } from "./middleware/errorHandler";
import { createSocketServer } from "./ws/handler";
import swaggerUi from "swagger-ui-express";
import { backendSpec } from "./docs/spec";
import { docsAuth } from "./middleware/docsAuth";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));

// ─── REST Routes ────────────────────────────────────────

app.use("/api/conversations", conversationRoutes);
app.use("/api/conversations", messageRoutes);
app.use("/api/users", userRoutes);

// ─── Health Check ───────────────────────────────────────

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ─── API Docs ────────────────────────────────────────────

if (process.env.NODE_ENV !== "production") {
  app.get("/docs/json", (_req, res) => {
    res.json(backendSpec);
  });

  if (process.env.NODE_ENV === "staging") {
    app.use("/docs", docsAuth, swaggerUi.serve, swaggerUi.setup(backendSpec));
  } else {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(backendSpec));
  }
}

app.use(errorHandler);

// ─── HTTP + Socket.IO Server ────────────────────────────

const server = http.createServer(app);
createSocketServer(server);

const PORT = parseInt(process.env.PORT || "4000", 10);

server.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
