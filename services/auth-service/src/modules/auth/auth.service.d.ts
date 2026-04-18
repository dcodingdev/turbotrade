import { RegisterInput, LoginInput } from '@repo/api-contracts';
import { User } from '@repo/types';
export declare const registerUser: (data: RegisterInput) => Promise<User>;
export declare const validateAndGenerateTokens: (data: LoginInput) => Promise<{
    user: User;
    accessToken: string;
    refreshToken: string;
}>;
export declare const refreshSession: (token: string) => Promise<{
    accessToken: string;
    newRefreshToken: string;
}>;
