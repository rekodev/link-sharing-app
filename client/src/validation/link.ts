import isUrl from 'is-url';

import { CustomizableLink } from '../types/link';
import mapPlatformUniqueness from '../utils/mapPlatformUniqueness';

export const validateLinksOnSubmit = (
  customizableLinks: Array<CustomizableLink>,
  onError: (validatedLinks: Array<CustomizableLink>) => void
) => {
  const validatedLinks = customizableLinks.map((link) => {
    const isLinkUrlValid = isUrl(link.linkUrl);
    const isLinkPlatformValid =
      mapPlatformUniqueness(customizableLinks)[link.platform];
    const hasErrors = !isLinkUrlValid || !isLinkPlatformValid;

    return {
      ...link,
      errors: { platform: !isLinkPlatformValid, linkUrl: !isLinkUrlValid },
      hasErrors,
    };
  });

  const allLinksValid = !validatedLinks.find(
    (link) => link.errors.linkUrl || link.errors.platform
  );

  if (!allLinksValid) {
    onError(validatedLinks);

    return false;
  }

  return true;
};

export const validatePlatformUniqueness = (
  newCustomizableLinks: Array<CustomizableLink>,
  prevLink: CustomizableLink
) => {
  const platformUniquenessMap = mapPlatformUniqueness(newCustomizableLinks);

  const validatedNewCustomizableLinks = newCustomizableLinks.map((link) => {
    const { platform: prevError } = prevLink.errors;

    const hasErrors = link.errors.linkUrl || link.errors.platform;
    const isPlatformUnique = platformUniquenessMap[link.platform];

    return isPlatformUnique
      ? { ...link, hasErrors, errors: { ...link.errors, platform: false } }
      : { ...link, hasErrors, errors: { ...link.errors, platform: prevError } };
  });

  return validatedNewCustomizableLinks;
};

export const validateLinkUrl = (
  link: CustomizableLink,
  inputtedLinkUrl: string,
  prevError: boolean
): CustomizableLink => {
  const { errors, hasErrors: isValidationRequired } = link;

  if (!isValidationRequired) return { ...link, linkUrl: inputtedLinkUrl };

  const linkUrlError = prevError
    ? !inputtedLinkUrl || !isUrl(inputtedLinkUrl)
    : false;
  const hasErrors = linkUrlError || link.errors.platform;

  const newLink: CustomizableLink = {
    ...link,
    linkUrl: inputtedLinkUrl,
    errors: { ...errors, linkUrl: linkUrlError },
    hasErrors,
  };

  return newLink;
};
