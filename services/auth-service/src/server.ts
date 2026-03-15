// services/auth-service/src/server.ts
import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from '@repo/logger';
import { connectDB } from '@repo/database';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/user.routes';
const app: Application = express();
const PORT = process.env.PORT || 4001;

// 1. Standard Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// 2. Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// 3. Simple Start Function
const start = async () => {
  try {
    // Connect to MongoDB using our shared package helper
    await connectDB(process.env.MONGO_URI!);
    
    app.listen(PORT, () => {
      logger.info(`Auth Service active on port ${PORT}`);
    });
  } catch (error) {
    logger.error({ err: error }, 'Failed to start server');
    process.exit(1);
  }
};

start();