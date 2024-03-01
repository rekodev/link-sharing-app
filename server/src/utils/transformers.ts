import { UserDto, UserModel } from "../types/user";

export const transformUser = (user: UserDto): UserModel => {
  return {
    id: user.id,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    profilePictureUrl: user.profile_picture_url,
  };
};
