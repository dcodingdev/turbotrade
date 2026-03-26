// 👈 You must explicitly export these so Product Service can "see" them
export { authenticate, authorize } from './src/middleware/auth.middleware.js';

// Optional: Export the IUser interface if you need it for typing elsewhere
export * from './src/modules/users/user.model.js';