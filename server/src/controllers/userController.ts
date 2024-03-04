import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
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
  const image = req.file;
  console.log(image.path);

  try {
    const user = await findUserById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    let uploadedImage: UploadApiResponse | null;

    if (image) {
      uploadedImage = await cloudinary.uploader.upload(
        `data:${image.mimetype};base64,${image.buffer.toString('base64')}`,
        {
          public_id: uuidv4(),
        }
      );

      console.log(uploadedImage);

      if (!uploadedImage)
        return res.status(400).json({ message: 'Unable to upload image' });
    }

    const updateSuccessful = await editUserInformation(userId, {
      firstName,
      lastName,
      email,
      profilePictureUrl: uploadedImage ? uploadedImage.url : '',
    });

    if (!updateSuccessful)
      return res
        .status(400)
        .json({ message: 'Unable to update profile details' });

    return res.status(200).json({
      message: 'User updated successfully',
      profileDetails: { firstName, lastName, email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error('Internal Server Error:', error);
  }
};
