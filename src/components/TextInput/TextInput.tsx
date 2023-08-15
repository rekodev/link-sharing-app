import { InputAdornment } from '@mui/material';
import linkIcon from '../../assets/images/icon-link.svg';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import { StyledTextField } from './style';
import { useState } from 'react';
import isUrl from 'is-url';
import { ILinkCardError } from '../../types/errors';

interface ITextInputProps {
  setNewLinks: React.Dispatch<
    React.SetStateAction<IShareableLinkValues[] | []>
  >;
  link: IShareableLinkValues;
  index: number;
  isError: ILinkCardError;
  setIsError: React.Dispatch<React.SetStateAction<ILinkCardError>>;
}

const TextInput = ({
  setNewLinks,
  link,
  index,
  isError,
  setIsError,
}: ITextInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputtedLink = event.target.value as string;

    setNewLinks((prev) => {
      const updatedLinks = Array.from(prev);

      const linkToUpdate = { ...link };

      linkToUpdate.link = inputtedLink;

      updatedLinks[index] = linkToUpdate;

      return updatedLinks;
    });

    setIsError((prev) => ({ ...prev, text: !isUrl(inputtedLink) }));
  };

  return (
    <StyledTextField
      error={isError.text && isError.attemptedSave}
      helperText={
        isError.text && isError.attemptedSave ? 'Please check the URL' : ''
      }
      id='outlined-basic'
      label='Link'
      onChange={handleChange}
      variant='outlined'
      value={link.link}
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
