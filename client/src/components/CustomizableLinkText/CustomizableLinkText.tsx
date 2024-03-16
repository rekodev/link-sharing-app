import isUrl from 'is-url';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { StyledTextFieldWrapper } from './style';
import linkIcon from '../../assets/images/icon-link.svg';
import { CustomizableLink } from '../../types/link';
import Input from '../shared/Input';

const validateLinkUrl = (
  link: CustomizableLink,
  inputtedLinkUrl: string,
  prevError: boolean
): CustomizableLink => {
  const { errors, hasErrors: isValidationRequired } = link;

  if (!isValidationRequired) return { ...link, linkUrl: inputtedLinkUrl };

  const linkUrlError = prevError
    ? !inputtedLinkUrl || !isUrl(inputtedLinkUrl)
    : false;
  const hasErrors = linkUrlError || link.errors.platform;

  const newLink: CustomizableLink = {
    ...link,
    linkUrl: inputtedLinkUrl,
    errors: { ...errors, linkUrl: linkUrlError },
    hasErrors,
  };

  return newLink;
};

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
    const inputtedLinkUrl = event.target.value;
    const prevError = !link.linkUrl || !isUrl(link.linkUrl);

    const newValidatedLink = validateLinkUrl(link, inputtedLinkUrl, prevError);
    const newCustomizableLinks = customizableLinks.map((link, index) =>
      index === linkIndex ? newValidatedLink : link
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
