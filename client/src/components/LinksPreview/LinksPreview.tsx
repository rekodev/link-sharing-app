import { useContext } from 'react';

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
import { LinkContext } from '../../contexts/linkContext';
import { ProfileDetailsContext } from '../../contexts/profileDetailsContext';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import { UserModel } from '../../types/user';
import { platforms } from '../../utils/platformList';
import PlatformLink from '../PlatformLink';

interface ILinksPreviewProps {
  user: UserModel;
}

const LinksPreview = ({ user }: ILinksPreviewProps) => {
  const { links } = useContext(LinkContext);
  const { profileDetails } = useContext(ProfileDetailsContext);
  const { firstName, email, lastName, profilePicture } = profileDetails;

  if (!user) return null;

  return (
    <StyledLinksPreview>
      <StyledLinksPreviewContainer>
        <StyledPhoneImageWrapper>
          <StyledProfileDetailsWrapper>
            <StyledProfilePictureWrapper $profilePicture={!!profilePicture.id}>
              {profilePicture.id && (
                <img src={profilePicture.id} alt='Profile Picture' />
              )}
            </StyledProfilePictureWrapper>
            <StyledProfileDetailsTextWrapper>
              <h3>{`${firstName} ${lastName}`}</h3>
              <p>{email}</p>
            </StyledProfileDetailsTextWrapper>
          </StyledProfileDetailsWrapper>
          <StyledPlatformWrapper>
            {links.map((link: IShareableLinkValues, idx: number) => {
              const matchedPlatform = platforms.find(
                (platform) => platform.name === link.platform
              );

              // Do not return more than 5 previewed links
              if (idx > 4) return null;

              if (matchedPlatform) {
                return (
                  <PlatformLink
                    key={idx}
                    svgIcon={matchedPlatform.svgIcon}
                    text={matchedPlatform.name}
                    url={link.link}
                  />
                );
              }
              return null;
            })}
          </StyledPlatformWrapper>
          <img src={phoneMockup} alt='' />
        </StyledPhoneImageWrapper>
      </StyledLinksPreviewContainer>
    </StyledLinksPreview>
  );
};

export default LinksPreview;
