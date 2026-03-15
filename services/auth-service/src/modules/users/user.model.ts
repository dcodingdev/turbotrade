// services/auth-service/src/modules/users/user.model.ts
import { mongoose } from '@repo/database';
import { UserRole } from '@repo/types';

/**
 * Interface representing the User document in MongoDB
 */
export interface IUserDocument extends mongoose.Document {
  id: string; 
  email: string;
  password: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false }, // Hidden by default in queries
    name: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['admin', 'vendor', 'customer'], 
      default: 'customer' 
    },
  },
  { 
    timestamps: true,
    // This allows us to use .id instead of ._id in our logic
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);