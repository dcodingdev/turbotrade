// //I added reservedQuantity. When an order is created but not yet paid, we move stock from quantity to reservedQuantity to prevent overselling.

// import mongoose, { Schema, Document } from "mongoose";

// export interface IStock extends Document {
//   productId: mongoose.Types.ObjectId;
//   vendor: mongoose.Types.ObjectId; 
//   quantity: number; // Actual physical stock
//   reservedQuantity: number; // Items in pending checkouts
//   status: "IN_STOCK" | "OUT_OF_STOCK" | "LOW_STOCK";
//   lowStockThreshold: number;
// }

// const stockSchema = new Schema<IStock>({
//   productId: { type: Schema.Types.ObjectId, ref: "Product", required: true, unique: true },
//   vendor: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
//   quantity: { type: Number, required: true, default: 0, min: 0 },
//   reservedQuantity: { type: Number, default: 0, min: 0 },
//   status: { type: String, enum: ["IN_STOCK", "OUT_OF_STOCK", "LOW_STOCK"], default: "OUT_OF_STOCK" },
//   lowStockThreshold: { type: Number, default: 10 },
// }, { timestamps: true });

// stockSchema.pre<IStock>("save", function () {
//   const available = this.quantity - this.reservedQuantity;
//   if (available <= 0) this.status = "OUT_OF_STOCK";
//   else if (available <= this.lowStockThreshold) this.status = "LOW_STOCK";
//   else this.status = "IN_STOCK";
// });

// export const Stock = mongoose.model<IStock>("Stock", stockSchema);






import mongoose, { Schema, Document } from "mongoose";

export interface IStock extends Document {
  productId: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;

  quantity: number;
  reservedQuantity: number;

  status: "IN_STOCK" | "OUT_OF_STOCK" | "LOW_STOCK";
  lowStockThreshold: number;

  createdAt: Date;
  updatedAt: Date;
}

const stockSchema = new Schema<IStock>(
  {
    productId: { 
      type: Schema.Types.ObjectId, 
      required: true, 
      unique: true, 
      index: true 
    },

    // ✅ No cross-service ref
    vendorId: { 
      type: Schema.Types.ObjectId, 
      required: true, 
      index: true 
    },

    quantity: { type: Number, required: true, default: 0, min: 0 },

    reservedQuantity: { type: Number, default: 0, min: 0 },

    status: { 
      type: String, 
      enum: ["IN_STOCK", "OUT_OF_STOCK", "LOW_STOCK"], 
      default: "OUT_OF_STOCK" 
    },

    lowStockThreshold: { type: Number, default: 10 },
  },
  { timestamps: true }
);

/**
 * Auto-calculate stock status
 */
stockSchema.pre<IStock>("save", function () {
  const available = this.quantity - this.reservedQuantity;

  if (available <= 0) this.status = "OUT_OF_STOCK";
  else if (available <= this.lowStockThreshold) this.status = "LOW_STOCK";
  else this.status = "IN_STOCK";
});

/**
 * Helpful indexes (Duplicates removed, already defined inline with index: true)
 */

export const Stock = mongoose.model<IStock>("Stock", stockSchema);