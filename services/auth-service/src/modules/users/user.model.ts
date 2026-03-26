// import { mongoose } from '@repo/database';
// import { UserRole } from '@repo/types';

// // Standardize on IUser
// export interface IUser extends mongoose.Document {
//   email: string;
//   password: string;
//   name: string;
//   role: UserRole;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const UserSchema = new mongoose.Schema<IUser>(
//   {
//     email: { type: String, required: true, unique: true, lowercase: true },
//     password: { type: String, required: true, select: false },
//     name: { type: String, required: true },
//     role: { 
//       type: String, 
//       enum: Object.values(UserRole), 
//       default: UserRole.CUSTOMER 
//     },
//   },
//   { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
// );

// // Export as User (standard) or UserModel (if you prefer)
// export const User = mongoose.model<IUser>('User', UserSchema);






// import { mongoose } from '@repo/database';
// import { UserRole } from '@repo/types';

// export interface IUser extends mongoose.Document {
//   id:string;
//   email: string;
//   password: string;
//   name: string;
//   role: UserRole;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const UserSchema = new mongoose.Schema<IUser>(
//   {
//     email: { 
//       type: String, 
//       required: true, 
//       unique: true, 
//       lowercase: true, 
//       trim: true 
//     },
//     password: { 
//       type: String, 
//       required: true, 
//       select: false 
//     },
//     name: { 
//       type: String, 
//       required: true, 
//       trim: true 
//     },
//     role: { 
//       type: String, 
//       enum: Object.values(UserRole), 
//       default: UserRole.CUSTOMER 
//     },
//   },
//   { 
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
// );

// // Optional helpful index
// UserSchema.index({ email: 1 });

// export const User = mongoose.model<IUser>('User', UserSchema);








import { mongoose } from '@repo/database';
import { UserRole } from '@repo/types';

export interface IUser extends mongoose.Document {
  _id: mongoose.Types.ObjectId; // ✅ correct type
  email: string;
  password: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: true, 
      select: false 
    },
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    role: { 
      type: String, 
      enum: Object.values(UserRole), 
      default: UserRole.CUSTOMER 
    },
  },
  { 
    timestamps: true
  }
);

// Optional index
UserSchema.index({ email: 1 });

export const User = mongoose.model<IUser>('User', UserSchema);