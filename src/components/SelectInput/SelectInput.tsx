import { InputLabel, SelectChangeEvent } from '@mui/material';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import { platforms } from '../../utils/platformList';
import { StyledFormControl, StyledMenuItem, StyledSelect } from './style';

interface ISelectInputProps {
  setNewLinks: React.Dispatch<React.SetStateAction<IShareableLinkValues[]>>;
  link: IShareableLinkValues;
  index: number;
}

const SelectInput = ({ setNewLinks, link, index }: ISelectInputProps) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedPlatform = event.target.value as string;

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
    </StyledFormControl>
  );
};

export default SelectInput;
