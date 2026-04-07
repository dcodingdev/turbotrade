import { Response } from "express";

/**
 * Stripe requires the raw body to verify webhook signatures.
 * This middleware captures the raw buffer before express.json() parses it.
 */
export const rawBodySaver = (
  req: any, 
  _res: Response, 
  buf: Buffer, 
  encoding: string
) => {
  if (buf && buf.length) {
    // Cast 'encoding' to BufferEncoding to satisfy the TypeScript overload
    req.rawBody = buf.toString((encoding as BufferEncoding) || "utf8");
  }
};