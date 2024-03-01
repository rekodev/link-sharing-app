declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export type UserCredentials = {
  email: string;
  password: string;
};

export type UserDto = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture_url: string;
  created_at: string;
  updated_at: string;
};

export type UserModel = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type UserProfileInfo = {
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl: string;
};
