// services/auth-service/src/modules/auth/auth.service.ts
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RegisterInput, LoginInput } from '@repo/api-contracts';
import { User, AuthResponse } from '@repo/types';
import { UserRepository } from '../users/user.repository';
import logger from '@repo/logger';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

export const registerUser = async (data: RegisterInput): Promise<User> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return UserRepository.create({ ...data, password: hashedPassword });
};

export const validateAndGenerateTokens = async (data: LoginInput) => {
  const user = await UserRepository.findByEmail(data.email);
  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const accessToken = jwt.sign(
    { id: user.id, role: user.role }, 
    ACCESS_SECRET, 
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { id: user.id }, 
    REFRESH_SECRET, 
    { expiresIn: '7d' }
  );

  return { user, accessToken, refreshToken };
};

export const refreshSession = async (token: string) => {
  const decoded = jwt.verify(token, REFRESH_SECRET) as { id: string };
  const user = await UserRepository.findById(decoded.id);
  
  if (!user) throw new Error('User not found');

  const accessToken = jwt.sign({ id: user.id, role: user.role }, ACCESS_SECRET, { expiresIn: '15m' });
  const newRefreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: '7d' });

  return { accessToken, newRefreshToken };
};