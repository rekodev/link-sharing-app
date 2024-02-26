import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import {
  createUser,
  doesUserExist,
  findUserByEmail,
  isPasswordCorrect,
} from '../database/user';
import { UserData } from '../types/user';

const generateAccessToken = (email: string) => {
  return jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password }: UserData = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    if (await doesUserExist(email)) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const userId = await createUser({ email, password });
    res.status(201).json({ message: 'User created successfully!', userId });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: UserData = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const user = findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    if (!(await isPasswordCorrect({ email, password }))) {
      return res.status(403).json({ message: 'Incorrect password' });
    }

    const accessToken = generateAccessToken(email);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      // secure: true,
      sameSite: 'strict',
      maxAge: 3600000,
    });

    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error('Internal Server Error:', error);
  }
};
