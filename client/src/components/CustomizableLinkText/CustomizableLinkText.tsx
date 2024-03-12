import isUrl from 'is-url';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { StyledTextFieldWrapper } from './style';
import linkIcon from '../../assets/images/icon-link.svg';
import { CustomizableLink } from '../../types/link';
import Input from '../shared/Input';

type Props = {
  customizableLinks: Array<CustomizableLink>;
  setCustomizableLinks: Dispatch<SetStateAction<Array<CustomizableLink>>>;
  link: CustomizableLink;
  index: number;
  isError: boolean;
};

const CustomizableLinkText = ({
  customizableLinks,
  setCustomizableLinks,
  link,
  index: linkIndex,
  isError,
}: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputtedLink = event.target.value as string;
    const linkError = !(inputtedLink && isUrl(inputtedLink));

    const newLink: CustomizableLink = {
      ...link,
      linkUrl: inputtedLink,
      errors: { ...link.errors, linkUrl: linkError },
    };
    const newCustomizableLinks = customizableLinks.map((link, index) =>
      index === linkIndex ? newLink : link
    );

    setCustomizableLinks(newCustomizableLinks);
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

export default CustomizableLinkText;
