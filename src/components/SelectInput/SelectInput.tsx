import { SelectChangeEvent } from '@mui/material';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import { platforms } from '../../utils/platformList';
import {
  StyledFormControl,
  StyledFormHelperText,
  StyledInputLabel,
  StyledMenuItem,
  StyledSelect,
} from './style';

interface ISelectInputProps {
  setNewLinks: React.Dispatch<React.SetStateAction<IShareableLinkValues[]>>;
  link: IShareableLinkValues;
  index: number;
  isError: boolean;
}

const SelectInput = ({
  setNewLinks,
  link,
  index,
  isError,
}: ISelectInputProps) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedPlatform = event.target.value as string;

    setNewLinks((prev): IShareableLinkValues[] => {
      const updatedLinks = Array.from(prev);

      const linkToUpdate = { ...link };

      linkToUpdate.platform = selectedPlatform;

      if (selectedPlatform) {
        linkToUpdate.errors.platform = false;
      } else {
        linkToUpdate.errors.platform = true;
      }

      updatedLinks[index] = linkToUpdate;

      return updatedLinks;
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

export default SelectInput;
