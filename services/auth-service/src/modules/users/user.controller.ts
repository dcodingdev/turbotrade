
// import { Request, Response } from 'express';
// import { User } from './user.model.js';
// import logger from '@repo/logger';

// export const getProfile = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user!._id; // ✅ fixed

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     logger.error({ err: error }, 'Get Profile Error');
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const updateProfile = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user!._id; // ✅ fixed

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { $set: req.body },
//       { new: true, runValidators: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(updatedUser);
//   } catch (error) {
//     logger.error({ err: error }, 'Update Profile Error');
//     res.status(500).json({ message: 'Failed to update profile' });
//   }
// };


import { Request, Response } from 'express';
import { User } from './user.model.js';
import logger from '@repo/logger';

export const getProfile = async (req: Request, res: Response) => {
  try {
    // req.user is populated by your authMiddleware (verifyToken)
    const userId = req.user?._id; 

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID missing' });
    }

    // .select('-password') ensures we never send the hash to the frontend
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    logger.error({ err: error }, 'Get Profile Error');
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { 
        // ❌ Change this: new: true 
        // ✅ To this:
        returnDocument: 'after', 
        runValidators: true 
      }
    ).select('-password -__v');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    logger.error({ err: error }, 'Update Profile Error');
    res.status(500).json({ message: 'Failed to update profile' });
  }
};