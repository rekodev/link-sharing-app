import ImageUpload from '../ImageUpload';
import { StyledCardHeading, StyledProfilePictureCard } from './style';

const ProfilePictureCard = () => {
  return (
    <StyledProfilePictureCard>
      <StyledCardHeading>Profile picture</StyledCardHeading>
      <ImageUpload />
      <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
    </StyledProfilePictureCard>
  );
};

export default ProfilePictureCard;
