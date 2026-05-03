import { Request, Response } from "express";
import { Review } from "./review.model.js";
import axios from "axios";
import logger from "@repo/logger";

const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || "http://localhost:4003/api/v1/orders";

export const createReview = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user?._id;
    const userName = req.user?.name;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // 1. Verify Purchaser Status (Call Order Service)
    let isVerified = false;
    try {
      const response = await axios.get(`${ORDER_SERVICE_URL}/me`, {
        headers: { Authorization: req.headers.authorization },
      });

      // Check if any completed order contains this product
      const orders = response.data.docs || []; // aggregatePaginate returns 'docs'
      isVerified = orders.some((order: any) => 
        order.orderStatus === "COMPLETED" && 
        order.items.some((item: any) => item.product.toString() === productId)
      );
    } catch (error: any) {
      logger.warn({ err: error }, "Failed to verify purchaser status via order-service");
      // Continue anyway, but isVerified remains false
    }

    // 2. Create Review
    const review = await Review.create({
      product: productId,
      customer: userId,
      customerName: userName,
      rating,
      comment,
      isVerified,
    });

    res.status(201).json({ success: true, data: review });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "You have already reviewed this product" });
    }
    logger.error({ err: error }, "Failed to create review");
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductReviews = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
