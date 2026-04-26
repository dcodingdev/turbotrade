import { Request, Response } from "express";
import * as payoutService from "./payout.service.js";

export const requestPayout = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const vendorId = req.user?._id;

    if (!vendorId) return res.status(401).json({ message: "Unauthorized" });

    const payout = await payoutService.initiatePayout(vendorId, amount);
    res.status(200).json({ success: true, data: payout });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};