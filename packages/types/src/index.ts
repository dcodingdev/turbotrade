// services/auth-service expects these exports:
export type UserRole = 'admin' | 'vendor' | 'customer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}