import { CircularProgress, Snackbar } from '@mui/material';
import { HttpStatusCode } from 'axios';
import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { mutate } from 'swr';

import { updateProfile } from '../../api';
import { SWRKeys } from '../../api/swr';
import useUser from '../../hooks/useUser';
import {
  StyledProfileContainer,
  StyledProfile as StyledProfileDetailsForm,
  StyledSaveButtonWrapper,
} from '../../pages/ProfileDetailsPage/style';
import { StyledAlert } from '../../styles/UtilityStyles';
import { ProfileDetailsFieldsError } from '../../types/errors';
import { ProfileDetails, SnackbarType } from '../../types/profileDetails';
import ImageUploadField from '../ImageUploadField';
import ProfileDetailsFields from '../ProfileDetailsFields';
import Button from '../shared/Button';

const ProfileDetailsForm = () => {
  const { user, isUserLoading } = useUser();

  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
    email: '',
    firstName: '',
    lastName: '',
    profilePictureUrl: '',
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [attemptedSave, setAttemptedSave] = useState(false);
  const [snackbarType, setSnackbarType] = useState<SnackbarType>('success');
  const [open, setOpen] = useState(false);
  const [profileDetailsFieldsError, setProfileDetailsFieldsError] =
    useState<ProfileDetailsFieldsError>({
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

    setOpen(false);
  };

  const handleImageUpload = (image: File) => {
    setProfilePicture(image);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user?.id) return;

    const { email, firstName, lastName } = profileDetails;

    setIsSubmitting(true);
    setSubmissionMessage('');
    setAttemptedSave(true);

    const response = await updateProfile(
      user.id,
      firstName,
      lastName,
      email,
      profilePicture
    );
    setIsSubmitting(false);
    setOpen(true);
    setSubmissionMessage(response.data.message);

    if (response.status !== HttpStatusCode.Ok) {
      setSnackbarType('error');

      return;
    }

    setSnackbarType('success');
    // setProfileDetails(newProfileDetails);

    mutate(SWRKeys.user(user.id));
  };

  const renderSnackbar = () => (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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
            attemptedSave={attemptedSave}
            setAttemptedSave={setAttemptedSave}
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
