import { CustomizableLink, LinkModel } from '../types/link';

export const transformCustomizableLink = (
  userId: number,
  customizableLink: CustomizableLink
  // Omitting id, createdAt and updatedAt because they're not needed when sending data to the backend
): LinkModel => {
  const { linkUrl, platform, index } = customizableLink;

  return {
    index,
    linkUrl,
    platform,
    userId,
  };
};
