import { CustomizableLink, LinkModel } from '../types/link';

export const transformCustomizableLink = (
  userId: number,
  customizableLink: CustomizableLink
): LinkModel => {
  const { linkUrl, platform, index } = customizableLink;

  return {
    index,
    linkUrl,
    platform,
    userId,
  };
};
