import { Dispatch, SetStateAction } from 'react';

import {
  StyledCardHeading,
  StyledProfilePictureCard,
  UploadedImageWrapper,
} from './style';
import { ProfilePicture } from '../../types/profileDetails';
import ImageUpload from '../ImageUpload';

type Props = {
  imageData: ProfilePicture;
  setImageData: Dispatch<SetStateAction<ProfilePicture>>;
};

const ImageUploadField = ({ imageData, setImageData }: Props) => {
  return (
    <>
      <h2>Profile Details</h2>
      <p>Add your details to create a personal touch to your profile.</p>
      <StyledProfilePictureCard>
        <StyledCardHeading>Profile picture</StyledCardHeading>
        <UploadedImageWrapper>
          <ImageUpload imageData={imageData} setImageData={setImageData} />
          <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </UploadedImageWrapper>
      </StyledProfilePictureCard>
    </>
  );
};

export default ImageUploadField;
