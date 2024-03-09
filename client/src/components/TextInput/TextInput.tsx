import isUrl from 'is-url';
import { Dispatch, SetStateAction } from 'react';

import { StyledTextFieldWrapper } from './style';
import linkIcon from '../../assets/images/icon-link.svg';
import { CustomizableLink } from '../../types/link';
import Input from '../Input';

type Props = {
  setNewLinks: Dispatch<SetStateAction<CustomizableLink[]>>;
  link: CustomizableLink;
  index: number;
  isError: boolean;
};

const TextInput = ({ setNewLinks, link, index, isError }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputtedLink = event.target.value as string;

    setNewLinks((prev) => {
      const updatedLinks = Array.from(prev);

      const linkToUpdate = { ...link };

      linkToUpdate.linkUrl = inputtedLink;

      if (inputtedLink && isUrl(inputtedLink)) {
        linkToUpdate.errors.linkUrl = false;
      } else {
        linkToUpdate.errors.linkUrl = true;
      }

      updatedLinks[index] = linkToUpdate;

      return updatedLinks;
    });
  };

  return (
    <StyledTextFieldWrapper>
      <Input
        type='text'
        label='Link'
        id='link'
        name='link'
        placeholder='e.g. https://www.github.com/johnappleseed'
        onChange={handleChange}
        value={link.linkUrl}
        error={isError}
        errorText='Please check the URL'
        imgSrc={linkIcon}
        imgName='Link Icon'
        initialStyle
      />
    </StyledTextFieldWrapper>
  );
};

export default TextInput;
