import { Request, Response } from 'express';
import { findUserById } from '../database/user';
import { insertLinks, getLinks } from '../database/link';
import { transformLink } from '../utils/transformers';

export const getUserLinks = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await findUserById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const userLinks = await getLinks(parseInt(userId));

    if (!userLinks.length)
      return res.status(400).json({ message: 'User links not found' });

    const transformedUserLinks = userLinks.map((link) => transformLink(link));

    return res.status(200).json({ links: transformedUserLinks });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error('Internal Server Error:', error);
  }
};

export const editUserLinks = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const {
    links,
  }: Record<
    string,
    Array<{ platform: string; linkUrl: string; index: number }>
  > = req.body;

  try {
    const user = await findUserById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const parsedUserId = parseInt(userId);
    const linkPromises = links.map((link) =>
      insertLinks(parsedUserId, link.platform, link.linkUrl, link.index)
    );
    const insertedLinks = await Promise.all(linkPromises);

    if (insertedLinks.includes(undefined))
      return res.status(400).json({ message: 'Unable to save links' });

    res.status(200).json({ message: 'Links saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error('Internal Server Error:', error);
  }
};
