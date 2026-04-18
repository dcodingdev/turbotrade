import jwt from 'jsonwebtoken';
export declare const generateTokens: (payload: {
    id: string;
    role: string;
}) => {
    accessToken: string;
    refreshToken: string;
};
export declare const verifyAccessToken: (token: string) => string | jwt.JwtPayload;
export declare const verifyRefreshToken: (token: string) => string | jwt.JwtPayload;
