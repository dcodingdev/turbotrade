// import 'dotenv/config';
// import express, { Application } from 'express';
// import cors from 'cors';
// import { Server } from 'http';

// import logger from '@repo/logger';
// import { connectDB, mongoose } from '@repo/database';
// import { connectRMQ, stopConsumers } from '@repo/rabbitmq';

// import { startProductConsumers } from './config/rabbit-consumer';

// // 1. Import Routes

// import stockRoutes from './modules/stock/stock.routes';
// import productRoutes from './modules/products/product.routes';

// const app: Application = express();
// const PORT = process.env.PORT || 4002;
// let server: Server;

// // Middleware
// app.use(express.json());
// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:3000',
//   credentials: true,
// }));

// // 2. Mount Routes
// app.use('/api/products', productRoutes);
// app.use('/api/stock', stockRoutes); // New Stock endpoints

// /**
//  * 🛡️ Graceful Shutdown
//  */
// const shutdown = async (signal: string) => {
//   logger.info({ signal }, '🚀 Product Service: Starting graceful shutdown');
  
//   try {
//     if (server) {
//       server.close();
//       logger.info('HTTP server closed.');
//     }

//     await stopConsumers();

//     if (mongoose.connection.readyState !== 0) {
//       await mongoose.connection.close();
//       logger.info('MongoDB connection closed.');
//     }

//     process.exit(0);
//   } catch (error) {
//     logger.error({ err: error }, '❌ Error during Product Service shutdown');
//     process.exit(1);
//   }
// };

// process.on('SIGTERM', () => shutdown('SIGTERM'));
// process.on('SIGINT', () => shutdown('SIGINT'));

// /**
//  * 🏁 Start Service
//  */
// const start = async () => {
//   try {
//     // Check for required Environment Variables
//     if (!process.env.MONGO_URI || !process.env.RABBITMQ_URL) {
//       throw new Error("Missing MONGO_URI or RABBITMQ_URL in environment");
//     }

//     await connectDB(process.env.MONGO_URI);
//     await connectRMQ(process.env.RABBITMQ_URL);

//     // This is where your RabbitMQ logic will handle the 
//     // "order.created" -> reserveStock() transition automatically
//     await startProductConsumers();

//     server = app.listen(PORT, () => {
//       logger.info(`📦 Product & Stock Service active on port ${PORT}`);
//     });

//     process.on('unhandledRejection', (reason) => {
//       logger.error({ reason }, 'Unhandled Rejection at Product Service');
//     });

//   } catch (error) {
//     logger.fatal({ err: error }, '💥 Failed to start Product Service');
//     process.exit(1);
//   }
// };

// start();



import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import { Server } from "http";

import logger from "@repo/logger";
import {connectDatabase, mongoose } from "@repo/database";
import { connectRMQ, stopConsumers } from "@repo/rabbitmq";

import { initProductConsumers} from "./config/rabbit-consumer.js";

// Routes
import stockroutes from "./modules/stock/stock.routes.js";
import productRoutes from "./modules/products/product.routes.js";

const app: Application = express();
const PORT = process.env.PORT || 4002;

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

app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ success: false, message: "Invalid JSON format" });
  }
  next();
});

/**
 * Routes
 */
app.use("/api/products", productRoutes);
app.use("/api/stock", stockroutes); // New Stock endpoints

/**
 * 🛡️ Graceful Shutdown
 */
const shutdown = async (signal: string) => {
  logger.info({ signal }, "🚀 Product Service: Starting graceful shutdown");

  try {
    if (server) {
      server.close();
      logger.info("HTTP server closed.");
    }

    await stopConsumers();

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      logger.info("MongoDB connection closed.");
    }

    process.exit(0);
  } catch (error) {
    logger.error({ err: error }, "❌ Error during Product Service shutdown");
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
    // Validate env
    if (!process.env.MONGO_URI || !process.env.RABBITMQ_URL) {
      throw new Error("Missing MONGO_URI or RABBITMQ_URL in environment");
    }

    /**
     * DB Connection
     */
    await connectDatabase();

    /**
     * RabbitMQ Connection
     */
    // const { channel } = await connectRMQ(process.env.RABBITMQ_URL);

    // if (!channel) {
    //   throw new Error("RabbitMQ channel not initialized");
    // }

    /**
     * Start Consumers
     */
    // await startProductConsumer(channel);

    /**
     * Start HTTP Server
     */
    server = app.listen(PORT, () => {
      logger.info(`📦 Product & Stock Service running on port ${PORT}`);
    });

    /**
     * Global Error Handling
     */
    process.on("unhandledRejection", (reason) => {
      logger.error({ reason }, "Unhandled Rejection");
    });

  } catch (error) {
    logger.fatal({ err: error }, "💥 Failed to start Product Service");
    process.exit(1);
  }
};

start();