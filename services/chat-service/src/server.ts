import "dotenv/config.js";
import express, { Application } from "express";
import cors from "cors";
import { Server } from "http";
import logger from "@repo/logger";

const app: Application = express();
const PORT = process.env.CHAT_PORT || 4006;

let server: Server;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", service: "chat-service" });
});

router.get("/", (req, res) => {
  res.status(200).json({ message: "Chat Service is running" });
});

app.use("/api/chat", router);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", service: "chat-service" });
});

const start = async () => {
  try {
    server = app.listen(PORT, () => {
      logger.info(`💬 Chat Service running on port ${PORT}`);
    });
  } catch (error) {
    logger.fatal({ err: error }, "💥 Failed to start Chat Service");
    process.exit(1);
  }
};

start();
