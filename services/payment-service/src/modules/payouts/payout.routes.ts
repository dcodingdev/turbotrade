import { Router } from "express";
import * as payoutController from "./payout.controller.js";
import { authenticate, authorize } from "@repo/common";
import { UserRole } from "@repo/types";

const router = Router();

router.route("/request")
  .post(
    authenticate, 
    authorize([UserRole.VENDOR]), 
    payoutController.requestPayout
  );

export default router;