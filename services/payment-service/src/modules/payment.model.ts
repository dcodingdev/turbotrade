import { mongoose, Schema, Document } from "@repo/database";

export interface IPayment extends Document {
  orderId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId; // References User (role: customer)
  method: "CARD" | "UPI" | "WALLET";
  transactionId: string; // From Stripe/Razorpay/PayPal
  status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
  amount: number;
  currency: string;
  gatewayResponse?: any; // Stores raw JSON from the provider
}

const paymentSchema = new Schema<IPayment>(
  {
    orderId: { 
      type: Schema.Types.ObjectId, 
      ref: "Order", 
      required: true, 
      index: true 
    },
    customerId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true 
    },
    method: { 
      type: String, 
      enum: ["CARD", "UPI", "WALLET"], 
      required: true 
    },
    transactionId: { 
      type: String, 
      unique: true, 
      sparse: true // Vital: allows the record to exist before the gateway returns an ID
    },
    status: { 
      type: String, 
      enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"], 
      default: "PENDING",
      index: true 
    },
    amount: { 
      type: Number, 
      required: true, 
      min: 0 
    },
    currency: { 
      type: String, 
      default: "USD" 
    },
    gatewayResponse: { 
      type: Schema.Types.Mixed 
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

/**
 * .plugin(mongooseAggregatePaginate) is handled globally by @repo/database.
 */

export const Payment = mongoose.model<IPayment, mongoose.AggregatePaginateModel<IPayment>>(
  "Payment", 
  paymentSchema
);