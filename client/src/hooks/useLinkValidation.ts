import isUrl from 'is-url';
import { Dispatch, SetStateAction } from 'react';

import { CustomizableLink } from '../types/link';
import mapPlatformUniqueness from '../utils/mapPlatformUniqueness';

type Props = {
  customizableLinks: Array<CustomizableLink>;
  setCustomizableLinks: Dispatch<SetStateAction<Array<CustomizableLink>>>;
};

const useLinkValidation = ({
  customizableLinks,
  setCustomizableLinks,
}: Props) => {
  const validateLinks = () => {
    const validatedLinks = customizableLinks.map((link) => {
      const isLinkUrlValid = isUrl(link.linkUrl);
      const isLinkPlatformValid =
        mapPlatformUniqueness(customizableLinks)[link.platform];

      return {
        ...link,
        errors: { platform: !isLinkPlatformValid, linkUrl: !isLinkUrlValid },
        attemptedSave: true,
      };
    });

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
