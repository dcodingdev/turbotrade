import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { AuthUser, UserRole } from '@repo/types';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';

// Explicitly typing as RequestHandler fixes the "Overload" error
export const authenticate: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, ACCESS_SECRET) as AuthUser;
    // We cast to any here ONLY for the assignment to avoid DB lookup logic
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
    return;
  }
};

export const authorize = (roles: UserRole[]): RequestHandler => {
  return (req, res, next) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    next();
  };
};

export const attachAuthenticatedUser: RequestHandler = authenticate;