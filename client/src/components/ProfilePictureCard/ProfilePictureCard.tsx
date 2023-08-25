import ImageUpload from '../ImageUpload';
import {
  StyledCardHeading,
  StyledProfilePictureCard,
  UploadedImageWrapper,
} from './style';

interface IProfilePictureCardProps {
  imageData: { src: string; name: string } | undefined;
  setImageData: React.Dispatch<
    React.SetStateAction<{ src: string; name: string } | undefined>
  >;
}

const ProfilePictureCard = ({
  imageData,
  setImageData,
}: IProfilePictureCardProps) => {
  return (
    <StyledProfilePictureCard>
      <StyledCardHeading>Profile picture</StyledCardHeading>
      <UploadedImageWrapper>
        <ImageUpload imageData={imageData} setImageData={setImageData} />
        <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
      </UploadedImageWrapper>
    </StyledProfilePictureCard>
  );
};

export default ProfilePictureCard;
