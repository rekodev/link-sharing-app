export type LinkModel = {
  id?: number | string;
  userId: number;
  index?: number;
  createdAt?: string;
  updatedAt?: string;
  platform: string;
  linkUrl: string;
};

export type UserLink = {
  platform: string;
  linkUrl: string;
  index?: number;
};

export type CustomizableLink = UserLink & {
  id: string;
  attemptedSave: boolean;
  isBeingDragged: boolean | undefined;
  errors: {
    platform: boolean;
    linkUrl: boolean;
  };
};
