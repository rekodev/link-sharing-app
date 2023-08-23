import ImageUpload from '../ImageUpload';
import {
  StyledCardHeading,
  StyledProfilePictureCard,
  UploadedImageWrapper,
} from './style';

const ProfilePictureCard = () => {
  return (
    <StyledProfilePictureCard>
      <StyledCardHeading>Profile picture</StyledCardHeading>
      <UploadedImageWrapper>
        <ImageUpload />
        <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
      </UploadedImageWrapper>
    </StyledProfilePictureCard>
  );
};

export default ProfilePictureCard;
