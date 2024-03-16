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
import { platforms } from '../../constants/platformList';
import useUser from '../../hooks/useUser';
import useUserLinks from '../../hooks/useUserLinks';
import { UserLink } from '../../types/link';
import PlatformLink from '../PlatformLink';

const REVALIDATE_ON_MOUNT = true;

const LinksPreview = () => {
  const { user } = useUser(REVALIDATE_ON_MOUNT);
  const { links } = useUserLinks(REVALIDATE_ON_MOUNT);

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

          return (
            <PlatformLink
              key={index}
              svgIcon={matchedPlatform.svgIcon}
              text={matchedPlatform.name}
              url={link.linkUrl}
            />
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
