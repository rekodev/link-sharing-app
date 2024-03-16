import { SelectChangeEvent } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import {
  StyledFormControl,
  StyledFormHelperText,
  StyledInputLabel,
  StyledMenuItem,
  StyledSelect,
} from './style';
import { platforms } from '../../constants/platformList';
import useUser from '../../hooks/useUser';
import useUserLinks from '../../hooks/useUserLinks';
import { CustomizableLink } from '../../types/link';
import mapPlatformUniqueness from '../../utils/mapPlatformUniqueness';
import { transformCustomizableLink } from '../../utils/transformers';

const validatePlatformUniqueness = (
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

type Props = {
  customizableLinks: Array<CustomizableLink>;
  setCustomizableLinks: Dispatch<SetStateAction<Array<CustomizableLink>>>;
  link: CustomizableLink;
  index: number;
  isError: boolean;
};

const CustomizableLinkSelect = ({
  customizableLinks,
  setCustomizableLinks,
  link,
  index: linkIndex,
  isError,
}: Props) => {
  const { user } = useUser();
  const { mutateLinks } = useUserLinks();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (!user?.id || !event.target.value) return;

    const selectedPlatform = event.target.value as string;
    const previousError = link.errors.platform;
    const platformError = previousError && link.platform === selectedPlatform;

    const updatedLink: CustomizableLink = {
      ...link,
      platform: selectedPlatform,
      errors: { ...link.errors, platform: platformError },
    };
    const newCustomizableLinks: Array<CustomizableLink> =
      customizableLinks.toSpliced(linkIndex, 1, updatedLink);

    const validatedNewCustomizableLinks = validatePlatformUniqueness(
      newCustomizableLinks,
      link
    );
    const transformedLinks = validatedNewCustomizableLinks.map((link) =>
      transformCustomizableLink(user.id!, link)
    );

    setCustomizableLinks(validatedNewCustomizableLinks);
    mutateLinks({ links: transformedLinks }, false);
  };

  return (
    <StyledFormControl $hasError={isError} fullWidth>
      <StyledInputLabel id='brand-select-label'>Platform</StyledInputLabel>
      <StyledSelect
        error={isError}
        labelId='brand-select-label'
        id='brand-select'
        value={link.platform}
        label='Platform'
        onChange={handleChange}
        $hasInput={!!link.platform}
      >
        {platforms.map((platform, idx) => (
          <StyledMenuItem key={idx} value={platform.name}>
            {platform.icon}
            {platform.name}
          </StyledMenuItem>
        ))}
      </StyledSelect>
      {isError && (
        <StyledFormHelperText>Platforms must be unique</StyledFormHelperText>
      )}
    </StyledFormControl>
  );
};

export default CustomizableLinkSelect;
