import { Router } from "express";
import * as payoutController from "./payout.controller";
import { authenticate, authorize } from "@repo/auth-service";
import { UserRole } from "@repo/types";

const router = Router();

router.route("/request")
  .post(
    authenticate, 
    authorize([UserRole.VENDOR]), 
    payoutController.requestPayout
  );

export default router;