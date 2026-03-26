





// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { UserRole , AuthUser} from '@repo/types';
// import logger from '@repo/logger';

// export const authenticate = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_ACCESS_SECRET!
//     ) as AuthUser;

//     // ✅ FIXED: use _id + include name
//     req.user = {
//       _id: decoded._id,
//       email: decoded.email,
//       name: decoded.name,
//       role: decoded.role,
//     };

//     next();
//   } catch (error: unknown) {
//     logger.error({ err: error }, 'JWT Verification Error');
//     return res.status(403).json({ message: 'Invalid or expired token' });
//   }
// };

// export const authorize = (roles: UserRole[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!req.user || !roles.includes(req.user.role)) {
//       return res.status(403).json({ message: 'Insufficient permissions' });
//     }
//     next();
//   };
// };




import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole, AuthUser } from '@repo/types';
import logger from '@repo/logger';

// Use a fallback or throw an error immediately if secret is missing
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  
  // Clean up the token extraction
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid format' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Note: If 'jwt.sign is not a function' occurs here, 
    // use: import pkg from 'jsonwebtoken'; const { verify } = pkg;
    const decoded = jwt.verify(token, ACCESS_SECRET) as AuthUser;

    // ✅ FIXED: Only assign fields that actually exist in your signed token
    // If you need email/name here, you MUST update auth.service.ts to include them in jwt.sign
    req.user = {
      _id: decoded._id,
      role: decoded.role,
      email: decoded.email || '', // Fallback to empty string if not in token
      name: decoded.name || '',
    };

    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    logger.error({ err: error.message }, 'JWT Verification Error');
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export const authorize = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      logger.warn({ userId: req.user?._id, role: req.user?.role }, 'Unauthorized Access Attempt');
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  };
};