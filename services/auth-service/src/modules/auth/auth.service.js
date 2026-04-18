import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../users/user.repository.js';
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
const mapToUser = (user) => ({
    _id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
});
// REGISTER
export const registerUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    // Overwrite the plain text password with the hashed one
    const user = await UserRepository.create({
        ...data,
        password: hashedPassword,
    });
    return mapToUser(user);
};
// LOGIN + TOKEN GENERATION
export const validateAndGenerateTokens = async (data) => {
    const user = await UserRepository.findByEmail(data.email);
    if (!user || !user.password) {
        throw new Error('Invalid credentials');
    }
    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
        throw new Error('Invalid credentials');
    }
    const accessToken = jwt.sign({ _id: user._id.toString(), role: user.role, name: user.name,
        email: user.email }, ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ _id: user._id.toString(), role: user.role, name: user.name,
        email: user.email }, REFRESH_SECRET, { expiresIn: '7d' });
    return {
        user: mapToUser(user),
        accessToken,
        refreshToken,
    };
};
// REFRESH SESSION (Kept as is, added error handling)
export const refreshSession = async (token) => {
    try {
        const decoded = jwt.verify(token, REFRESH_SECRET);
        const user = await UserRepository.findById(decoded._id);
        if (!user)
            throw new Error('User not found');
        const accessToken = jwt.sign({ _id: user._id.toString(), role: user.role }, ACCESS_SECRET, { expiresIn: '15m' });
        const newRefreshToken = jwt.sign({ _id: user._id.toString() }, REFRESH_SECRET, { expiresIn: '7d' });
        return { accessToken, newRefreshToken };
    }
    catch (err) {
        throw new Error('Invalid or expired refresh token');
    }
};
//# sourceMappingURL=auth.service.js.map