// services/auth-service/src/modules/auth/auth.routes.ts
import { Router } from 'express';
import * as AuthController from './auth.controller';
import { validate } from '../../middleware/validate';
import { RegisterSchema, LoginSchema } from '@repo/api-contracts';

const router = Router();

router.post('/register', validate(RegisterSchema), AuthController.register);
router.post('/login', validate(LoginSchema), AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/logout', AuthController.logout);

export default router;