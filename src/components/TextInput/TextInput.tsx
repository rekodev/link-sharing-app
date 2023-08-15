import { InputAdornment } from '@mui/material';
import { useEffect, useState } from 'react';
import linkIcon from '../../assets/images/icon-link.svg';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import { StyledTextField } from './style';

interface ITextInputProps {
  setPlatformAndLink: React.Dispatch<
    React.SetStateAction<IShareableLinkValues>
  >;
}

const TextInput = ({ setPlatformAndLink }: ITextInputProps) => {
  const [inputtedLink, setInputtedLink] = useState('');

  useEffect(() => {
    setPlatformAndLink((prev: IShareableLinkValues) => ({
      ...prev,
      link: inputtedLink,
    }));
  }, [inputtedLink]);

  return (
    <StyledTextField
      id='outlined-basic'
      label='Link'
      onChange={(e) => setInputtedLink(e.target.value)}
      variant='outlined'
      placeholder='e.g. https://www.github.com/johnappleseed'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <img src={linkIcon} alt='Link' />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default TextInput;
