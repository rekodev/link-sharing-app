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
import { transformCustomizableLink } from '../../utils/transformers';

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
    if (!user?.id) return;

    const selectedPlatform = event.target.value as string;
    // const previousPlatform = link.platform;
    const previousError = link.errors.platform;
    const platformError = previousError && link.platform === selectedPlatform;

    console.log(platformError);

    const updatedLink: CustomizableLink = {
      ...link,
      platform: selectedPlatform,
      errors: { ...link.errors, platform: platformError },
    };
    // if I select a link that has prevError and platformError is false then I want to map newCustomizableLinks to return
    // an updatedLink with platform error false as long as the platform === selectedPlatform

    const newCustomizableLinks = customizableLinks.map(
      (link: CustomizableLink, index) => {
        // TODO: Implement proper validation logic
        return index === linkIndex ? updatedLink : link;

        // return index === linkIndex
        //   ? updatedLink
        //   : !updatedLink.errors.platform
        //   ? {
        //       ...link,
        //       errors: {
        //         ...link.errors,
        //         platform: link.platform === selectedPlatform ? false : true,
        //       },
        //     }
        //   : link;
      }
    );

    const transformedLinks = newCustomizableLinks.map((link) =>
      transformCustomizableLink(user.id!, link)
    );

    setCustomizableLinks(newCustomizableLinks);
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
