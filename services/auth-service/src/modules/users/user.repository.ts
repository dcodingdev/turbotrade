import { RegisterInput } from '@repo/api-contracts';
import { User, IUser } from './user.model.js';

export const UserRepository = {
  async create(data: RegisterInput): Promise<IUser> {
    // Ensure email is lowercase before saving
    return User.create({
      ...data,
      email: data.email.toLowerCase()
    });
  },

  async findByEmail(email: string): Promise<IUser | null> {
    // Explicitly select password because it is hidden in the schema
    return User.findOne({ email: email.toLowerCase() }).select('+password');
  },

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  },

  async exists(email: string): Promise<boolean> {
    const count = await User.countDocuments({ email: email.toLowerCase() });
    return count > 0;
  }
};