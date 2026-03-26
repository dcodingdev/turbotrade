import { UserRole } from '@repo/types';

declare global {
  namespace Express {
    interface User {
      _id: string;
      email: string;
      name: string;
      role: UserRole;
    }

    interface Request {
      user?: User;
    }
  }
}