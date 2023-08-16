import { useRef, useState } from 'react';
import Button from '../../components/Button';
import ProfileForm from '../../components/ProfileForm';
import ProfilePictureCard from '../../components/ProfilePictureCard';
import {
  StyledProfile,
  StyledProfileContainer,
  StyledSaveButtonWrapper,
} from './style';

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

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
          formData={formData}
          setFormData={setFormData}
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
