


import { Request, Response } from "express";
import {Product} from "./product.model";
import logger from "@repo/logger";
import { Stock } from "../stock/stock.model";
import { publishEvent, RMQ_NAMES } from "@repo/rabbitmq";
import { UserRole } from "@repo/types";
import crypto from "crypto";

/**
 * Create Product
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const product = await Product.create({
      ...req.body,
      vendor: {
        id: user._id,
        name: user.name,
      },
    });

    await Stock.create({
      productId: product._id,
      vendorId: user._id,
      quantity: 0,
      reservedQuantity: 0,
    });

    await publishEvent(
      RMQ_NAMES.getExchange("product", "product", "topic"),
      "product.created",
      {
        event: "product.created.v1",
        data: {
          id: product._id,
          name: product.name,
          vendorId: user._id,
        },
        meta: {
          messageId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          source: "product-service",
          version: 1,
        },
      }
    );

    res.status(201).json({ success: true, data: product });
  } catch (error: any) {
    logger.error({ err: error }, "Create product failed");
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Get All Products
 */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, category, vendor, search } = req.query;

    const query: any = { isDraft: false };

    if (category) query.category = category;
    if (vendor) query["vendor.id"] = vendor;
    if (search) query.name = { $regex: search, $options: "i" };

    const aggregate = Product.aggregate([{ $match: query }]);

    const result = await (Product as any).aggregatePaginate(aggregate, {
      page: Number(page),
      limit: Number(limit),
      sort: { createdAt: -1 },
    });

    res.status(200).json({ success: true, ...result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get Product By ID
 */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update Product
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }

    const isOwner = product.vendor.id.toString() === req.user?._id;
    const isAdmin = req.user?.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { vendor, ...updateData } = req.body;

    Object.assign(product, updateData);
    await product.save();

    res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Delete Product
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false });
    }

    const isOwner = product.vendor.id.toString() === req.user?._id;
    const isAdmin = req.user?.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await product.deleteOne();
    await Stock.deleteOne({ productId: req.params.id });

    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Toggle Publish
 */
export const togglePublishStatus = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false });
    }

    const isOwner = product.vendor.id.toString() === req.user?._id;
    const isAdmin = req.user?.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    product.isDraft = !product.isDraft;
    await product.save();

    res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};