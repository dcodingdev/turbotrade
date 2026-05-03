import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/http-error.js';
import logger from '@repo/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  logger.error({ err }, 'Unhandled Error');
  res.status(500).json({ message: 'Internal Server Error' });
};
