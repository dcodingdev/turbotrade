// services/auth-service/src/modules/users/user.repository.ts
import { RegisterInput } from '@repo/api-contracts';
import { User } from '@repo/types';
import { UserModel, IUserDocument } from './user.model';

export const UserRepository = {
  async create(data: RegisterInput): Promise<User> {
    const user = await UserModel.create(data);
    return user.toJSON() as User;
  },

  async findByEmail(email: string): Promise<IUserDocument | null> {
    // We explicitly select +password here because the model hides it by default,
    // and we need it for login password comparison.
    return UserModel.findOne({ email }).select('+password');
  },

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    return user ? (user.toJSON() as User) : null;
  },

  async exists(email: string): Promise<boolean> {
    const count = await UserModel.countDocuments({ email });
    return count > 0;
  }
};