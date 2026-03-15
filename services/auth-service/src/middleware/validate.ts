import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError, ZodIssue } from 'zod';
import logger from '@repo/logger';

export const validate = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error: unknown) {
      // This check fixes the "type unknown" error
      if (error instanceof ZodError) {
        res.status(400).json({
          status: 'fail',
          // Adding (e: ZodIssue) fixes the "implicit any" error
          errors: error.errors.map((e: ZodIssue) => ({ 
            path: e.path, 
            message: e.message 
          }))
        });
        return;
      }
      
      logger.error({ err: error }, 'Unexpected Validation Error');
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };