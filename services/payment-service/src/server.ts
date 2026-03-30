import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import { Server } from "http";

import logger from "@repo/logger";
import { connectDatabase, mongoose } from "@repo/database";
import { connectRMQ, stopConsumers } from "@repo/rabbitmq";

// Routes
import paymentRoutes from "./modules/payments/payment.routes.js";
import payoutRoutes from "./modules/payouts/payout.routes.js";

const app: Application = express();
const PORT = process.env.PORT || 4004;

let server: Server;

/**
 * Middleware
 */
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

/**
 * Routes
 */
app.use("/api/payments", paymentRoutes);
app.use("/api/payouts", payoutRoutes);

/**
 * 🛡️ Graceful Shutdown
 */
const shutdown = async (signal: string) => {
  logger.info({ signal }, `🚀 Payment Service: Starting graceful shutdown`);

  try {
    if (server) server.close();
    await stopConsumers();
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(0);
  } catch (error) {
    logger.error({ err: error }, "❌ Error during Payment Service shutdown");
    process.exit(1);
  }
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

/**
 * 🚀 Start Service
 */
const start = async () => {
  try {
    if (!process.env.MONGO_URI || !process.env.RABBITMQ_URL) {
      throw new Error("Missing MONGO_URI or RABBITMQ_URL");
    }

    await connectDatabase();
    
    // Connect to RabbitMQ so we can Publish 'payment.success' events
    await connectRMQ(process.env.RABBITMQ_URL);

    server = app.listen(PORT, () => {
      logger.info(`💸 Payment Service running on port ${PORT}`);
    });

  } catch (error) {
    logger.fatal({ err: error }, "💥 Failed to start Payment Service");
    process.exit(1);
  }
};

start();