import { useEffect } from 'react';

import {
  StyledLinksPreview,
  StyledLinksPreviewContainer,
  StyledPhoneImageWrapper,
  StyledPlatformWrapper,
  StyledProfileDetailsTextWrapper,
  StyledProfileDetailsWrapper,
  StyledProfilePictureWrapper,
} from './style';
import phoneMockup from '../../assets/images/illustration-phone-mockup.svg';
import useUser from '../../hooks/useUser';
import useUserLinks from '../../hooks/useUserLinks';
import { UserLink } from '../../types/link';
import { platforms } from '../../utils/platformList';
import PlatformLink from '../PlatformLink';

const LinksPreview = () => {
  const { user, isUserLoading } = useUser();
  const { links, isLinksLoading } = useUserLinks();
  // const { profileDetails } = useContext(ProfileDetailsContext);
  // const { firstName, email, lastName, profilePicture } = profileDetails;

  useEffect(() => {
    console.log(links);
    console.log(user);
  }, [user, links]);

  const renderLinks = () => (
    <StyledPlatformWrapper>
      {links?.map((link: UserLink, idx: number) => {
        const matchedPlatform = platforms.find(
          (platform) => platform.name === link.platform
        );

        // Do not return more than 5 previewed links
        if (idx > 4 || !matchedPlatform) return null;

        return (
          <PlatformLink
            key={link.index}
            svgIcon={matchedPlatform.svgIcon}
            text={matchedPlatform.name}
            url={link.linkUrl}
          />
        );
      })}
    </StyledPlatformWrapper>
  );

  if (isUserLoading || isLinksLoading) return null;

  return (
    <StyledLinksPreview>
      <StyledLinksPreviewContainer>
        <StyledPhoneImageWrapper>
          <StyledProfileDetailsWrapper>
            <StyledProfilePictureWrapper $profilePicture={!!user?.id}>
              {user?.id && (
                <img src={user.profilePictureUrl} alt='Profile Picture' />
              )}
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
