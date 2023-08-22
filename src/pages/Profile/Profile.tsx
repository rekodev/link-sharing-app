import { useContext, useRef } from 'react';
import Button from '../../components/Button';
import ProfileForm from '../../components/ProfileForm';
import ProfilePictureCard from '../../components/ProfilePictureCard';
import { ProfileDetailsContext } from '../../contexts/profileDetailsContext';
import {
  StyledProfile,
  StyledProfileContainer,
  StyledSaveButtonWrapper,
} from './style';

const Profile = () => {
  const { profileDetails, setProfileDetails } = useContext(
    ProfileDetailsContext
  );

  const formRef = useRef<HTMLFormElement | null>(null);
  

  const handleSaveClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <StyledProfile>
      <StyledProfileContainer>
        <h2>Profile Details</h2>
        <p>Add your details to create a personal touch to your profile.</p>
        <ProfilePictureCard />
        <ProfileForm
          ref={formRef}
          profileDetails={profileDetails}
          setProfileDetails={setProfileDetails}
        />
      </StyledProfileContainer>
      <StyledSaveButtonWrapper>
        <Button
          variant='contained'
          text='Save'
          type='submit'
          onClick={handleSaveClick}
        />
      </StyledSaveButtonWrapper>
    </StyledProfile>
  );
};

export default Profile;
