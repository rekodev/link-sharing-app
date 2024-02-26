import { Request, Response } from 'express';
import { findUserByEmail } from '../database/user';

export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const user = await findUserByEmail(email);

    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error('Internal Server Error:', error);
  }
};
