import { ReactNode } from 'react';

import { StyledPlatformLink } from './style';
import arrowIcon from '../../assets/images/icon-arrow-right.svg';

interface IPlatformLinkProps {
  text: string;
  svgIcon: ReactNode;
  url: string;
}

const PlatformLink = ({ text, svgIcon, url }: IPlatformLinkProps) => {
  return (
    <StyledPlatformLink href={url} $platform={text} target='_blank'>
      {svgIcon}
      {text}
      <img src={arrowIcon} alt='Arrow Right Icon' />
    </StyledPlatformLink>
  );
};

export default PlatformLink;
