export type CreateUserResp = {
  userId: number;
  message: string;
};

export type LoginResp = {
  message: string;
  accessToken: string;
};

export type UpdateProfileResp = {
  message: string;
  profileDetails: {
    firstName: string;
    lastName: string;
    email: string;
  };
};
