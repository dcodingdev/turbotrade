import { RegisterInput } from '@repo/api-contracts';
import { IUser } from './user.model.js';
export declare const UserRepository: {
    create(data: RegisterInput): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
    exists(email: string): Promise<boolean>;
};
