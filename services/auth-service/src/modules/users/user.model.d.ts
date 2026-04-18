import { mongoose } from '@repo/database';
import { UserRole } from '@repo/types';
export interface IUser extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    name: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
