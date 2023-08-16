import arrowIcon from '../../assets/images/icon-arrow-right.svg';
import { StyledPlatformLink } from './style';

interface IPlatformLinkProps {
  text: string;
  svgIcon: React.ReactNode;
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
