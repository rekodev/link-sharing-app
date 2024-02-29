import { CircularProgress } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';

import {
  StyledProfile,
  StyledProfileContainer,
  StyledSaveButtonWrapper,
} from './style';
import Button from '../../components/Button';
import LinksPreview from '../../components/LinksPreview';
import ProfileForm from '../../components/ProfileForm';
import ProfilePictureCard from '../../components/ProfilePictureCard';
import { LinkContext } from '../../contexts/linkContext';
import { ProfileDetailsContext } from '../../contexts/profileDetailsContext';
import useUser from '../../hooks/useUser';

const Profile = () => {
  const { user, isUserLoading } = useUser();

  const { profileDetails, setProfileDetails } = useContext(
    ProfileDetailsContext
  );
  const { links } = useContext(LinkContext);
  const [newProfileDetails, setNewProfileDetails] = useState(profileDetails);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imageData, setImageData] = useState<
    { src: string; name: string } | undefined
  >(profileDetails.profilePicture);

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSaveClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  useEffect(() => {
    if (!user) return;

    setNewProfileDetails({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: {
        src: '',
        name: '',
      },
    });
  }, [user]);

  if (isUserLoading)
    return <CircularProgress color='primary' sx={{ margin: 'auto' }} />;

  return (
    <>
      <LinksPreview
        links={links}
        profileDetails={newProfileDetails}
        imageData={imageData}
        user={user}
      />
      <StyledProfile>
        <StyledProfileContainer>
          <h2>Profile Details</h2>
          <p>Add your details to create a personal touch to your profile.</p>
          <ProfilePictureCard
            imageData={imageData}
            setImageData={setImageData}
          />
          <ProfileForm
            ref={formRef}
            setProfileDetails={setProfileDetails}
            newProfileDetails={newProfileDetails}
            setNewProfileDetails={setNewProfileDetails}
            setIsSubmitting={setIsSubmitting}
          />
        </StyledProfileContainer>
        <StyledSaveButtonWrapper>
          <Button
            variant='contained'
            text='Save'
            type='submit'
            onClick={handleSaveClick}
            isLoading={isSubmitting}
          />
        </StyledSaveButtonWrapper>
      </StyledProfile>
    </>
  );
};

export default Profile;
