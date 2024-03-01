import { NextFunction, Request, Response } from 'express';
import { UserCredentials } from '../types/types';

export const checkAuthPayload = (
  req: Request<UserCredentials>,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: UserCredentials = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  next();
};
