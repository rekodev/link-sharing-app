export type LinkModel = {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  platform: string;
  linkUrl: string;
};

export type UserLink = {
  platform: string;
  linkUrl: string;
};
