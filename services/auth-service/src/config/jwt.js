import jwt from 'jsonwebtoken';
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';
export const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
export const verifyAccessToken = (token) => jwt.verify(token, ACCESS_SECRET);
export const verifyRefreshToken = (token) => jwt.verify(token, REFRESH_SECRET);
//# sourceMappingURL=jwt.js.map