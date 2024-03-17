import { ReactNode } from 'react';

import {
  StyledLinksPreview,
  StyledLinksPreviewContainer,
  StyledPhoneImageWrapper,
  StyledPlatformWrapper,
  StyledProfileDetailsTextWrapper,
  StyledProfileDetailsWrapper,
  StyledProfilePictureWrapper,
  StyledPlatformLink,
} from './style';
import arrowIcon from '../../assets/images/icon-arrow-right.svg';
import phoneMockup from '../../assets/images/illustration-phone-mockup.svg';
import { platforms } from '../../constants/platformList';
import useUser from '../../hooks/useUser';
import useUserLinks from '../../hooks/useUserLinks';
import { UserLink } from '../../types/link';

const REVALIDATE_ON_MOUNT = true;

const LinksPreview = () => {
  const { user } = useUser(REVALIDATE_ON_MOUNT);
  const { links } = useUserLinks(REVALIDATE_ON_MOUNT);

  const renderLink = (
    index: number,
    text: string,
    svgIcon: ReactNode,
    url: string
  ) => (
    <StyledPlatformLink key={index} href={url} $platform={text} target='_blank'>
      {svgIcon}
      {text}
      <img src={arrowIcon} alt='Arrow Right Icon' />
    </StyledPlatformLink>
  );

  const renderLinks = () => {
    if (!links) return null;

    return (
      <StyledPlatformWrapper>
        {links.map((link: UserLink, index: number) => {
          const matchedPlatform = platforms.find(
            (platform) => platform.name === link.platform
          );

          // Do not return more than 5 previewed links
          if (index > 4 || !matchedPlatform) return null;

          return renderLink(
            index,
            matchedPlatform.name,
            matchedPlatform.svgIcon,
            link.linkUrl
          );
        })}
      </StyledPlatformWrapper>
    );
  };

  if (!user) return null;

  return (
    <StyledLinksPreview>
      <StyledLinksPreviewContainer>
        <StyledPhoneImageWrapper>
          <StyledProfileDetailsWrapper>
            <StyledProfilePictureWrapper $profilePicture={!!user}>
              <img src={user.profilePictureUrl} alt='Profile Picture' />
            </StyledProfilePictureWrapper>
            <StyledProfileDetailsTextWrapper>
              <h3>{`${user?.firstName} ${user?.lastName}`}</h3>
              <p>{user?.email}</p>
            </StyledProfileDetailsTextWrapper>
          </StyledProfileDetailsWrapper>
          {renderLinks()}
          <img src={phoneMockup} alt='' />
        </StyledPhoneImageWrapper>
      </StyledLinksPreviewContainer>
    </StyledLinksPreview>
  );
};

export default LinksPreview;
