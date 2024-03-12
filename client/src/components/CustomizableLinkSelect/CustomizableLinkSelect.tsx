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
  setCustomizableLinks: Dispatch<SetStateAction<Array<CustomizableLink>>>;
  link: CustomizableLink;
  index: number;
  isError: boolean;
};

const CustomizableLinkSelect = ({
  setCustomizableLinks,
  link,
  index,
  isError,
}: Props) => {
  const { user } = useUser();
  const { mutateLinks } = useUserLinks();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (!user?.id) return;

    const selectedPlatform = event.target.value as string;

    const updateLinks = (
      links: Array<CustomizableLink>,
      index: number,
      selectedPlatform: string
    ) => {
      const updatedLinks = Array.from(links);
      const linkToUpdate = { ...updatedLinks[index] };

      linkToUpdate.platform = selectedPlatform;
      linkToUpdate.errors.platform = !selectedPlatform;

      updatedLinks[index] = linkToUpdate;

      return updatedLinks;
    };

    setCustomizableLinks((prev) => {
      mutateLinks(
        {
          links: updateLinks(prev, index, selectedPlatform).map((link) =>
            transformCustomizableLink(user.id!, link)
          ),
        },
        false
      );

      return updateLinks(prev, index, selectedPlatform);
    });
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
