import { Router } from 'express';
import { authenticate } from '@repo/common'; // ✅ Clean workspace import
import { getProfile, updateProfile } from './user.controller.js';

const router: Router = Router();

/**
 * All routes here are protected. 
 * The 'authenticate' middleware ensures only logged-in users 
 * with a valid Bearer Token can access them.
 */

// GET /api/users/profile
router.get('/profile', authenticate, getProfile);

// PATCH /api/users/profile
router.patch('/profile', authenticate, updateProfile);

export default router;