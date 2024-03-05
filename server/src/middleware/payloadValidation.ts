import { NextFunction, Request, Response } from 'express';
import { LinkModel, UserCredentials } from '../types/types';

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

export const checkLinkPayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    links,
  }: Record<string, Array<{ platform: string; linkUrl: string }>> = req.body;

  if (!links.length) {
    return res.status(400).json({ message: 'Add at least one link' });
  }

  const allLinksNotEmpty = links.every((link) => link.platform && link.linkUrl);

  if (!allLinksNotEmpty)
    return res
      .status(400)
      .json({ message: 'All links must have a platform and a link url' });

  next();
};
