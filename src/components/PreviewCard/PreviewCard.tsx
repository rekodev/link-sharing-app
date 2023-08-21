import { useContext } from 'react';
import { ProfileDetailsContext } from '../../contexts/profileDetailsContext';
import {
  StyledAvatar,
  StyledPreviewCard,
  StyledProfilePictureWrapper,
} from './style';

const PreviewCard = () => {
  const { profileDetails } = useContext(ProfileDetailsContext);

  return (
    <StyledPreviewCard>
      <StyledProfilePictureWrapper>
        {profileDetails.profilePicture ? (
          <img src={profileDetails.profilePicture} alt='Profile Picture' />
        ) : (
          <StyledAvatar src='/broken-image.jpg' />
        )}
      </StyledProfilePictureWrapper>
      <h3>{`${profileDetails.firstName} ${profileDetails.lastName}`}</h3>
      <p>{profileDetails.email}</p>
    </StyledPreviewCard>
  );
};

export default PreviewCard;
