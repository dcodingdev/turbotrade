import multer from "multer";
import { Request, Response, NextFunction } from "express";
export declare const upload: multer.Multer;
/**
 * Middleware for multiple image upload
 */
export declare const uploadToImageKit: (req: Request, res: Response, next: NextFunction) => Promise<void>;
