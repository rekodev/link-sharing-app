import phoneMockup from "../../assets/images/illustration-phone-mockup.svg";
import { IProfileDetails } from "../../types/profileDetails";
import { IShareableLinkValues } from "../../types/shareableLinkValues";
import { UserModel } from "../../types/user";
import { platforms } from "../../utils/platformList";
import PlatformLink from "../PlatformLink";
import {
  StyledLinksPreview,
  StyledLinksPreviewContainer,
  StyledPhoneImageWrapper,
  StyledPlatformWrapper,
  StyledProfileDetailsTextWrapper,
  StyledProfileDetailsWrapper,
  StyledProfilePictureWrapper,
} from "./style";

interface ILinksPreviewProps {
  links: IShareableLinkValues[];
  profileDetails: IProfileDetails;
  imageData?: { src: string; name: string } | undefined;
  user: UserModel;
}

const LinksPreview = ({
  links,
  profileDetails,
  imageData,
  user,
}: ILinksPreviewProps) => {
  if (!user) return null;

  return (
    <StyledLinksPreview>
      <StyledLinksPreviewContainer>
        <StyledPhoneImageWrapper>
          <StyledProfileDetailsWrapper>
            <StyledProfilePictureWrapper
              $profilePicture={
                profileDetails.profilePicture.src || imageData?.src
                  ? true
                  : false
              }
            >
              {imageData?.src ? (
                <img src={imageData.src} alt="Profile Picture" />
              ) : (
                profileDetails.profilePicture.src && (
                  <img
                    src={profileDetails.profilePicture.src}
                    alt="Profile Picture"
                  />
                )
              )}
            </StyledProfilePictureWrapper>
            <StyledProfileDetailsTextWrapper>
              <h3>{`${profileDetails.firstName} ${profileDetails.lastName}`}</h3>
              <p>{user.email}</p>
            </StyledProfileDetailsTextWrapper>
          </StyledProfileDetailsWrapper>
          <StyledPlatformWrapper>
            {links.map((link: IShareableLinkValues, idx: number) => {
              const matchedPlatform = platforms.find(
                (platform) => platform.name === link.platform
              );

              // Do not return more than 5 previewed links
              if (idx > 4) {
                return null;
              }

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
          <img src={phoneMockup} alt="" />
        </StyledPhoneImageWrapper>
      </StyledLinksPreviewContainer>
    </StyledLinksPreview>
  );
};

export default LinksPreview;
