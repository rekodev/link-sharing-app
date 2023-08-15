import { FormHelperText, InputLabel, SelectChangeEvent } from '@mui/material';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import { platforms } from '../../utils/platformList';
import {
  StyledFormControl,
  StyledFormHelperText,
  StyledMenuItem,
  StyledSelect,
} from './style';
import { ILinkCardError } from '../../types/errors';

interface ISelectInputProps {
  setNewLinks: React.Dispatch<React.SetStateAction<IShareableLinkValues[]>>;
  link: IShareableLinkValues;
  index: number;
  isError: ILinkCardError;
  setIsError: React.Dispatch<React.SetStateAction<ILinkCardError>>;
}

const SelectInput = ({
  setNewLinks,
  link,
  index,
  isError,
  setIsError,
}: ISelectInputProps) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedPlatform = event.target.value as string;

    if (selectedPlatform) {
      setIsError((prev) => ({ ...prev, select: false }));
    }

    setNewLinks((prev): IShareableLinkValues[] => {
      const updatedLinks = Array.from(prev);

      const linkToUpdate = { ...link };

      linkToUpdate.platform = selectedPlatform;

      updatedLinks[index] = linkToUpdate;

      return updatedLinks;
    });
  };

  return (
    <StyledFormControl fullWidth>
      <InputLabel id='brand-select-label'>Platform</InputLabel>
      <StyledSelect
        error={isError.select && isError.attemptedSave}
        labelId='brand-select-label'
        id='brand-select'
        value={link.platform}
        label='Platform'
        onChange={handleChange}
      >
        {platforms.map((platform, idx) => (
          <StyledMenuItem key={idx} value={platform.name}>
            {platform.icon}
            {platform.name}
          </StyledMenuItem>
        ))}
      </StyledSelect>
      {isError.select && isError.attemptedSave && (
        <StyledFormHelperText>You must select a platform</StyledFormHelperText>
      )}
    </StyledFormControl>
  );
};

export default SelectInput;
