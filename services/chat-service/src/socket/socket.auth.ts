import jwt from "jsonwebtoken";
import type { TypedServer } from "./socket.types";

export function applySocketAuth(io: TypedServer): void {
  io.use((socket, next) => {
    const token =
      (socket.handshake.auth?.token as string) ||
      (socket.handshake.headers["authorization"] as string);

    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    const cleanToken = token.startsWith("Bearer ")
      ? token.slice(7)
      : token;

    try {
      const secret = process.env.JWT_ACCESS_SECRET;
      if (!secret) {
        return next(new Error("Server configuration error: JWT secret missing"));
      }

      const decoded = jwt.verify(cleanToken, secret) as {
        _id: string;
        email: string;
        role: string;
      };

      socket.data.user = {
        _id: decoded._id,
        email: decoded.email,
        role: decoded.role,
      };

      next();
    } catch (err) {
      next(new Error("Authentication error: Invalid or expired token"));
    }
  });
}
