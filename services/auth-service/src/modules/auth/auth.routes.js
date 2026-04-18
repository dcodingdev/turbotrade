// services/auth-service/src/modules/auth/auth.routes.ts
import { Router } from 'express';
import * as AuthController from './auth.controller.js';
const router = Router();
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/logout', AuthController.logout);
export default router;
//# sourceMappingURL=auth.routes.js.map