import { UserModel } from "./user";

export type CreateUserResp = {
  userId: number;
  message: string;
};

export type LoginResp = {
  message: string;
  user: UserModel;
};

export type UpdateProfileResp = {
  message: string;
  profileDetails: {
    firstName: string;
    lastName: string;
    email: string;
  };
};
