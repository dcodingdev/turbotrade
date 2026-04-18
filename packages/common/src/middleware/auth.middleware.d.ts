import { RequestHandler } from 'express';
import { UserRole } from '@repo/types';
export declare const authenticate: RequestHandler;
export declare const authorize: (roles: UserRole[]) => RequestHandler;
