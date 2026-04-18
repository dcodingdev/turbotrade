import mongoose, { Document as MongooseDocument } from "mongoose";
/**
 * Connect Database (Dynamic per service)
 */
export declare const connectDatabase: (mongoUri: string) => Promise<void>;
/**
 * Close DB
 */
export declare const closeDatabase: () => Promise<void>;
export { mongoose };
export declare const Schema: typeof mongoose.Schema, Types: typeof mongoose.Types, model: typeof mongoose.model;
export type Document = MongooseDocument;
