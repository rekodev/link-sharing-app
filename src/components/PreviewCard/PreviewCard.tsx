import { useContext } from 'react';
import profilePicture from '../../assets/images/illustration-phone-mockup.svg';
import { StyledPreviewCard, StyledProfilePictureWrapper } from './style';
import { ProfileDetailsContext } from '../../contexts/profileDetailsContext';

const PreviewCard = () => {
  const { profileDetails } = useContext(ProfileDetailsContext);

  return (
    <StyledPreviewCard>
      <StyledProfilePictureWrapper>
        <img src={profilePicture} alt='Profile Picture' />
      </StyledProfilePictureWrapper>
      <h3>{`${profileDetails.firstName} ${profileDetails.lastName}`}</h3>
      <p>{profileDetails.email}</p>
    </StyledPreviewCard>
  );
};

export default PreviewCard;
