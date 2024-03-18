import { CircularProgress, Snackbar } from '@mui/material';
import { HttpStatusCode } from 'axios';
import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';

import { updateProfile } from '../../api';
import useUser from '../../hooks/useUser';
import {
  StyledProfileContainer,
  StyledProfile as StyledProfileDetailsForm,
  StyledSaveButtonWrapper,
} from '../../pages/ProfileDetailsPage/style';
import { StyledAlert } from '../../styles/UtilityStyles';
import {
  ProfileDetails,
  ProfileDetailsError,
  SnackbarType,
} from '../../types/profileDetails';
import { validateProfileDetails } from '../../validation/profileDetails';
import ImageUploadField from '../ImageUploadField';
import ProfileDetailsFields from '../ProfileDetailsFields';
import Button from '../shared/Button';

const ProfileDetailsForm = () => {
  const { user, isUserLoading, mutateUser } = useUser();

  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
    email: '',
    firstName: '',
    lastName: '',
    profilePictureUrl: '',
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [hasErrors, setHasErrors] = useState(false);
  const [snackbarType, setSnackbarType] = useState<SnackbarType>('success');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [profileDetailsFieldsError, setProfileDetailsFieldsError] =
    useState<ProfileDetailsError>({
      firstName: false,
      lastName: false,
      email: false,
    });

  useEffect(() => {
    if (!user) return;

    setProfileDetails({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePictureUrl: user.profilePictureUrl,
    });
  }, [user]);

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackbarOpen(false);
  };

  const handleImageUpload = (image: File, imageSrc: string) => {
    if (!user) return;

    setProfilePicture(image);
    mutateUser(
      { ...profileDetails, id: user.id, profilePictureUrl: imageSrc },
      false
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (!user?.id) return;

    event.preventDefault();

    const isProfileDetailsValid = validateProfileDetails(profileDetails);

    if (!isProfileDetailsValid) {
      setHasErrors(true);

      return;
    }

    const { email, firstName, lastName } = profileDetails;

    setIsSubmitting(true);
    setSubmissionMessage('');
    setIsSnackbarOpen(false);

    const response = await updateProfile(
      user.id,
      firstName,
      lastName,
      email,
      profilePicture
    );

    setIsSubmitting(false);
    setIsSnackbarOpen(true);
    setSubmissionMessage(response.data.message);

    if (response.status !== HttpStatusCode.Ok) {
      setSnackbarType('error');

      return;
    }

    setSnackbarType('success');
    mutateUser();
  };

  const renderSnackbar = () => (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <StyledAlert
        onClose={handleClose}
        severity={snackbarType}
        sx={{ width: '100%' }}
      >
        {submissionMessage}
      </StyledAlert>
    </Snackbar>
  );

  if (isUserLoading)
    return <CircularProgress color='primary' sx={{ margin: 'auto' }} />;

  return (
    <>
      <StyledProfileDetailsForm onSubmit={handleSubmit}>
        <StyledProfileContainer>
          <ImageUploadField onImageUpload={handleImageUpload} />
          <ProfileDetailsFields
            hasErrors={hasErrors}
            setHasErrors={setHasErrors}
            profileDetails={profileDetails}
            setProfileDetails={setProfileDetails}
            error={profileDetailsFieldsError}
            setError={setProfileDetailsFieldsError}
          />
        </StyledProfileContainer>
        <StyledSaveButtonWrapper>
          <Button
            variant='contained'
            text='Save'
            type='submit'
            onClick={handleSubmit}
            isLoading={isSubmitting}
          />
        </StyledSaveButtonWrapper>
      </StyledProfileDetailsForm>

      {renderSnackbar()}
    </>
  );
};

export default ProfileDetailsForm;
