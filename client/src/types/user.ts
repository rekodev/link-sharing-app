export type UserModel = {
  id: null | number;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
};

export type UserDto = {
  id: null | number;
  created_at: string;
  updated_at: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture_url: string;
};
