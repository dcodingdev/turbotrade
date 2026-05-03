import { Request } from 'express';
import { AuthUser } from '@repo/types';
import { HttpError } from './http-error.js';

export const getAuthenticatedUser = (req: Request): AuthUser => {
  const user = (req as any).user as AuthUser | undefined;
  if (!user) {
    throw new HttpError(401, 'Unauthorized');
  }
  return user;
};
