import { Router } from "express";
import * as paymentController from "./payment.controller";
import { authenticate } from "@repo/auth-service";

const router = Router();

router.route("/process")
  .post(authenticate, paymentController.createPayment);

export default router;