// // services/auth-service/src/modules/users/user.service.ts
// import { UserRepository } from './user.repository';
// import { User } from '@repo/types';

// export const getUserProfile = async (userId: string): Promise<User> => {
//   const user = await UserRepository.findById(userId);
//   if (!user) {
//     throw new Error('User not found');
//   }
//   return user;
// };

// // You can add logic for updating profiles or changing passwords here