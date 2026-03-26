import mongoose, { Document as MongooseDocument } from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import logger from '@repo/logger';

/**
 * Global Plugin Registration
 * Automatically adds .aggregatePaginate() to every schema created.
 */
mongoose.plugin(mongooseAggregatePaginate);

export const connectDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    logger.error('❌ MONGO_URI is not defined in environment variables');
    process.exit(1);
  }

  // Prevent multiple connections (useful in serverless or hot-reload dev environments)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    // Event Listeners for lifecycle management
    mongoose.connection.on('connected', () => {
      logger.info(`🍃 MongoDB Connected: ${mongoose.connection.host}`);
    });

    mongoose.connection.on('error', (err) => {
      logger.error({ err }, '❌ MongoDB connection error');
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️ MongoDB disconnected');
    });

    await mongoose.connect(mongoUri, {
      autoIndex: true, // Ensures unique constraints and indexes are built
    });

  } catch (error) {
    logger.error({ err: error }, '❌ Failed to connect to MongoDB');
    process.exit(1);
  }
};

/**
 * Gracefully close the database connection
 */
export const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.close();
  logger.info('MongoDB connection closed');
};

// Export core mongoose members for consistent usage across the service
export { mongoose };
export const { Schema, Types, model } = mongoose;

// Types
export type Document = MongooseDocument;