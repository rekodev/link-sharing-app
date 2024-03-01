import { Request, Response } from 'express';
import { editUserInformation, findUserById } from '../database/user';
import { transformUser } from '../utils/transformers';

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await findUserById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json(transformUser(user));
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error('Internal Server Error:', error);
  }
};

export const editUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { firstName, lastName, email } = req.body;

  try {
    const user = await findUserById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const updateSuccessful = await editUserInformation(userId, {
      firstName,
      lastName,
      email,
      profilePictureUrl: '',
    });

    if (!updateSuccessful) {
      return res
        .status(400)
        .json({ message: 'Unable to update profile details' });
    }

    return res.status(200).json({
      message: 'User updated successfully',
      profileDetails: { firstName, lastName, email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error('Internal Server Error:', error);
  }
};
