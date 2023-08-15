import profilePicture from '../../assets/images/illustration-phone-mockup.svg';
import { StyledPreviewCard, StyledProfilePictureWrapper } from './style';

const PreviewCard = () => {
  return (
    <StyledPreviewCard>
      <StyledProfilePictureWrapper>
        <img src={profilePicture} alt='' />
      </StyledProfilePictureWrapper>
      <h3>Ben Wright</h3>
      <p>ben@example.com</p>
    </StyledPreviewCard>
  );
};

export default PreviewCard;
