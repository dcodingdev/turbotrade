import mongoose, { Document as MongooseDocument } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import logger from "@repo/logger";

mongoose.plugin(mongooseAggregatePaginate);

/**
 * Connect Database (Dynamic per service)
 */
export const connectDatabase = async (mongoUri: string): Promise<void> => {
  if (!mongoUri) {
    logger.error("❌ Mongo URI is missing");
    process.exit(1);
  }

  if (mongoose.connection.readyState >= 1) return;

  try {
    mongoose.connection.on("connected", () => {
      logger.info(`🍃 MongoDB Connected: ${mongoose.connection.host}`);
    });

    mongoose.connection.on("error", (err) => {
      logger.error({ err }, "❌ MongoDB connection error");
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("⚠️ MongoDB disconnected");
    });

    await mongoose.connect(mongoUri, {
      autoIndex: true,
    });
  } catch (error) {
    logger.error({ err: error }, "❌ Failed to connect to MongoDB");
    process.exit(1);
  }
};

/**
 * Close DB
 */
export const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.close();
  logger.info("MongoDB connection closed");
};

export { mongoose };
export const { Schema, Types, model } = mongoose;
export type Document = MongooseDocument;