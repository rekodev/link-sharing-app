import { LinkDto, LinkModel, UserDto, UserModel } from '../types';

export const transformUser = (user: UserDto): UserModel => ({
  id: user.id,
  createdAt: user.created_at,
  updatedAt: user.updated_at,
  email: user.email,
  firstName: user.first_name,
  lastName: user.last_name,
  profilePictureUrl: user.profile_picture_url,
});

export const transformLink = (link: LinkDto): LinkModel => ({
  id: link.id,
  userId: link.user_id,
  linkUrl: link.link_url,
  updatedAt: link.updated_at,
  createdAt: link.created_at,
  platform: link.platform,
  index: link.index,
});
