import { Request, Response } from 'express';
import { UserModel } from './user.model';
import logger from '@repo/logger';

export const getProfile = async (req: Request, res: Response) => {
  try {
    // req.user is populated by the 'authenticate' middleware
    const user = await UserModel.findById(req.user!.id);
    
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
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user!.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(updatedUser);
  } catch (error) {
    logger.error({ err: error }, 'Update Profile Error');
    res.status(500).json({ message: 'Failed to update profile' });
  }
};