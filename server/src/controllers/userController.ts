import { Request, Response } from 'express';
import { createUser, doesUserExist } from '../models/userModel';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (await doesUserExist(email)) {
      return res
        .status(409)
        .json({ status: '409', message: 'User already exists' });
    }

    const userId = await createUser({ email, password });
    res
      .status(201)
      .json({ message: 'User created successfully!', userId: userId });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
