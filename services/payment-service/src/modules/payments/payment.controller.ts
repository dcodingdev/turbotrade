import { Request, Response } from "express";
import { mongoose } from "@repo/database"; // Import mongoose to use Types.ObjectId
import * as paymentService from "./payment.service";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { orderId, amount, gateway } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Explicitly cast strings to ObjectIds to satisfy the IPayment interface
    const payment = await paymentService.processPaymentLogic({
      orderId: new mongoose.Types.ObjectId(orderId),
      customerId: new mongoose.Types.ObjectId(user._id),
      amount,
      gateway,
    });

    res.status(200).json({ success: true, data: payment });
  } catch (error: any) {
    // Handle cases where orderId string is not a valid ObjectId format
    res.status(400).json({ success: false, message: error.message });
  }
};