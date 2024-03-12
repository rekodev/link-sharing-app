import { SelectChangeEvent } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import {
  StyledFormControl,
  StyledFormHelperText,
  StyledInputLabel,
  StyledMenuItem,
  StyledSelect,
} from './style';
import useUser from '../../hooks/useUser';
import useUserLinks from '../../hooks/useUserLinks';
import { CustomizableLink } from '../../types/link';
import { platforms } from '../../utils/platformList';
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
    const updatedLink: CustomizableLink = {
      ...link,
      platform: selectedPlatform,
      errors: { ...link.errors, platform: !selectedPlatform },
    };

    const newCustomizableLinks = customizableLinks.map((link, index) =>
      index === linkIndex ? updatedLink : link
    );
    const transformedLinks = newCustomizableLinks.map((link) =>
      transformCustomizableLink(user.id!, link)
    );

    setCustomizableLinks(newCustomizableLinks);
    mutateLinks({ links: transformedLinks }, false);
  };

  return (
    <StyledFormControl fullWidth>
      <StyledInputLabel id='brand-select-label'>Platform</StyledInputLabel>
      <StyledSelect
        error={isError}
        labelId='brand-select-label'
        id='brand-select'
        value={link.platform}
        label='Platform'
        onChange={handleChange}
        $hasInput={link.platform ? true : false}
      >
        {platforms.map((platform, idx) => (
          <StyledMenuItem key={idx} value={platform.name}>
            {platform.icon}
            {platform.name}
          </StyledMenuItem>
        ))}
      </StyledSelect>
      {isError && (
        <StyledFormHelperText>You must select a platform</StyledFormHelperText>
      )}
    </StyledFormControl>
  );
};

export default CustomizableLinkSelect;
