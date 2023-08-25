import { useContext, useRef, useState } from 'react';
import Button from '../../components/Button';
import ProfileForm from '../../components/ProfileForm';
import ProfilePictureCard from '../../components/ProfilePictureCard';
import { ProfileDetailsContext } from '../../contexts/profileDetailsContext';
import {
  StyledProfile,
  StyledProfileContainer,
  StyledSaveButtonWrapper,
} from './style';
import LinksPreview from '../../components/LinksPreview';
import { LinkContext } from '../../contexts/linkContext';

const Profile = () => {
  const { profileDetails, setProfileDetails } = useContext(
    ProfileDetailsContext
  );
  const { links } = useContext(LinkContext);
  const [newProfileDetails, setNewProfileDetails] = useState(profileDetails);

  const [imageData, setImageData] = useState<
    { src: string; name: string } | undefined
  >(profileDetails.profilePicture);

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSaveClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <>
      <LinksPreview
        links={links}
        profileDetails={newProfileDetails}
        imageData={imageData}
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
    </>
  );
};

export default Profile;
