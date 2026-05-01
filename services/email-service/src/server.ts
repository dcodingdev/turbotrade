import "dotenv/config.js";
import express, { Application } from "express";
import cors from "cors";
import { Server } from "http";
import logger from "@repo/logger";

const app: Application = express();
const PORT = process.env.EMAIL_PORT || 4005;

let server: Server;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", service: "email-service" });
});

router.get("/", (req, res) => {
  res.status(200).json({ message: "Email Service is running" });
});

app.use("/api/email", router);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", service: "email-service" });
});

const start = async () => {
  try {
    server = app.listen(PORT, () => {
      logger.info(`📧 Email Service running on port ${PORT}`);
    });
  } catch (error) {
    logger.fatal({ err: error }, "💥 Failed to start Email Service");
    process.exit(1);
  }
};

start();
