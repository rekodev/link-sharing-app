import isUrl from 'is-url';
import { Dispatch, SetStateAction } from 'react';

import { CustomizableLink } from '../types/link';

type Props = {
  customizableLinks: Array<CustomizableLink>;
  setCustomizableLinks: Dispatch<SetStateAction<Array<CustomizableLink>>>;
};

const useLinkValidation = ({
  customizableLinks,
  setCustomizableLinks,
}: Props) => {
  const validateLink = (link: CustomizableLink): CustomizableLink => {
    const isLinkUrlValid = isUrl(link.linkUrl);
    const isLinkPlatformValid = !!link.platform;

    return {
      ...link,
      errors: { platform: !isLinkPlatformValid, linkUrl: !isLinkUrlValid },
      attemptedSave: true,
    };
  };

  const validateLinks = () => {
    const uniquePlatforms =
      new Set(customizableLinks.map((link) => link.platform)).size ===
      customizableLinks.length;

    if (!uniquePlatforms) return false;

    const validatedLinks = customizableLinks.map((link) => validateLink(link));

    const allLinksValid = !validatedLinks.find(
      (link) => link.errors.linkUrl || link.errors.platform
    );

    if (!allLinksValid) {
      setCustomizableLinks(validatedLinks);
    }

    return allLinksValid;
  };

  return { validateLinks };
};

export default useLinkValidation;
