// import { Request, Response } from "express";
// import { Stock } from "./stock.model";
// import logger from "@repo/logger";

// /**
//  * 🛠️ Update Physical Stock (Vendor Action)
//  * Used when a vendor adds new inventory.
//  */
// export const updatePhysicalStock = async (req: Request, res: Response) => {
//   try {
//     const { productId } = req.params;
//     const { quantity, lowStockThreshold } = req.body;

//     const stock = await Stock.findOneAndUpdate(
//       { productId },
//       { 
//         $set: { quantity, lowStockThreshold },
//       },
//       { new: true, upsert: true, runValidators: true }
//     );

//     // .save() is called implicitly or we manually trigger it to run the 'pre-save' hook 
//     // for status logic. Alternatively, use a find and then save:
//     await stock.save(); 

//     res.status(200).json({ success: true, data: stock });
//   } catch (error: any) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// /**
//  * 🕒 Reserve Stock (Internal/System Action)
//  * Moves quantity from 'available' to 'reserved' when an order is created.
//  */
// export const reserveStock = async (req: Request, res: Response) => {
//   try {
//     const { productId } = req.params;
//     const { amount } = req.body; // e.g., 2 items

//     // Atomic update: ensure we have enough physical stock minus currently reserved
//     const stock = await Stock.findOne({ productId });

//     if (!stock || (stock.quantity - stock.reservedQuantity) < amount) {
//       return res.status(400).json({ success: false, message: "Insufficient stock available" });
//     }

//     stock.reservedQuantity += amount;
//     await stock.save(); // Triggers the status update hook

//     res.status(200).json({ success: true, data: stock });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * ✅ Confirm Sale (After Payment)
//  * Deducts from both physical quantity AND reserved quantity.
//  */
// export const confirmSale = async (req: Request, res: Response) => {
//   try {
//     const { productId } = req.params;
//     const { amount } = req.body;

//     const stock = await Stock.findOne({ productId });

//     if (!stock || stock.reservedQuantity < amount) {
//       return res.status(404).json({ message: "Insufficient reserved stock" });
//     }

//     stock.quantity -= amount;
//     stock.reservedQuantity -= amount;
    
//     await stock.save(); // This correctly triggers your status hook!
    
//     res.status(200).json({ success: true, data: stock });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * ❌ Release Reservation (Order Cancelled/Expired)
//  * Moves reserved back to available pool.
//  */
// export const releaseReservation = async (req: Request, res: Response) => {
//   try {
//     const { productId } = req.params;
//     const { amount } = req.body;

//     const stock = await Stock.findOneAndUpdate(
//       { productId },
//       { $inc: { reservedQuantity: -amount } },
//       { new: true }
//     );

//     await stock!.save();
//     res.status(200).json({ success: true, data: stock });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


import { Request, Response } from "express";
import { Stock } from "./stock.model.js";
import logger from "@repo/logger";

/**
 * Update Physical Stock
 * Vendor updates total inventory levels.
 */
export const updatePhysicalStock = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { quantity, lowStockThreshold } = req.body;

    const stock = await Stock.findOneAndUpdate(
      { productId },
      { $set: { quantity, lowStockThreshold } },
      { new: true, upsert: true, runValidators: true }
    );

    // Save triggers 'pre-save' hooks for status logic (e.g., In Stock vs Out of Stock)
    await stock.save();

    res.status(200).json({ success: true, data: stock });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Reserve Stock
 * Atomic check to ensure availability before incrementing reserved quantity.
 */
export const reserveStock = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { amount } = req.body;

    // Use findOne first to check business logic
    const stock = await Stock.findOne({ productId });

    if (!stock) return res.status(404).json({ success: false, message: "Stock record not found" });
    
    // Check if (Total - Reserved) is enough
    if ((stock.quantity - stock.reservedQuantity) < amount) {
      return res.status(400).json({ success: false, message: "Insufficient stock available" });
    }

    stock.reservedQuantity += amount;
    await stock.save();

    res.status(200).json({ success: true, data: stock });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Confirm Sale
 * Deducts from physical quantity AND clears the reservation.
 */
export const confirmSale = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { amount } = req.body;

    // Use atomic update to prevent negative reserved stock
    const stock = await Stock.findOneAndUpdate(
      { productId, reservedQuantity: { $gte: amount } },
      { 
        $inc: { 
          quantity: -amount, 
          reservedQuantity: -amount 
        } 
      },
      { new: true }
    );

    if (!stock) {
      return res.status(400).json({ success: false, message: "Sale confirmation failed: Insufficient reserved stock" });
    }

    await stock.save(); // Refresh status
    res.status(200).json({ success: true, data: stock });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Release Reservation
 * Used if an order is cancelled or payment fails.
 */
export const releaseReservation = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { amount } = req.body;

    const stock = await Stock.findOneAndUpdate(
      { productId, reservedQuantity: { $gte: amount } },
      { $inc: { reservedQuantity: -amount } },
      { new: true }
    );

    if (!stock) {
      return res.status(400).json({ success: false, message: "No active reservation found to release" });
    }

    await stock.save();
    res.status(200).json({ success: true, data: stock });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};