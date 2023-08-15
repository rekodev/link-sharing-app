import { InputLabel, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { platforms } from '../../utils/platformList';
import { StyledFormControl, StyledMenuItem, StyledSelect } from './style';
import { IShareableLinkValues } from '../../types/shareableLinkValues';

interface ISelectInputProps {
  setPlatformAndLink: React.Dispatch<
    React.SetStateAction<IShareableLinkValues>
  >;
}

const SelectInput = ({ setPlatformAndLink }: ISelectInputProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedPlatform(event.target.value as string);
  };

  useEffect(() => {
    setPlatformAndLink((prev: IShareableLinkValues) => ({
      ...prev,
      platform: selectedPlatform,
    }));
  }, [selectedPlatform]);

  return (
    <StyledFormControl fullWidth>
      <InputLabel id='brand-select-label'>Platform</InputLabel>
      <StyledSelect
        labelId='brand-select-label'
        id='brand-select'
        value={selectedPlatform}
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
