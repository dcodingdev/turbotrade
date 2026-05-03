import { mongoose, Schema, Document } from "@repo/database";

export interface IReview extends Document {
  product: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  customerName: string;
  rating: number;
  comment: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    product: { 
      type: Schema.Types.ObjectId, 
      ref: "Product", 
      required: true, 
      index: true 
    },
    customer: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    customerName: { 
      type: String, 
      required: true 
    },
    rating: { 
      type: Number, 
      required: true, 
      min: 1, 
      max: 5 
    },
    comment: { 
      type: String, 
      required: true, 
      trim: true 
    },
    isVerified: { 
      type: Boolean, 
      default: false 
    },
  },
  { 
    timestamps: true 
  }
);

// Prevent multiple reviews for the same product by the same user
reviewSchema.index({ product: 1, customer: 1 }, { unique: true });

export const Review = mongoose.model<IReview>("Review", reviewSchema);
