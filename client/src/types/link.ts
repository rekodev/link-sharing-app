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

export type CustomizableLinkErrors = {
  platform: boolean;
  linkUrl: boolean;
};

export type CustomizableLink = UserLink & {
  id: string;
  isBeingDragged: boolean | undefined;
  hasErrors: boolean;
  errors: CustomizableLinkErrors;
};
