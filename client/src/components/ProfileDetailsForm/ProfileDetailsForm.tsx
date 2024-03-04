import { CircularProgress, Snackbar } from '@mui/material';
import { HttpStatusCode } from 'axios';
import {
  FormEvent,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { mutate } from 'swr';

import { updateProfile } from '../../api';
import { SWRKeys } from '../../api/swr';
import { ProfileDetailsContext } from '../../contexts/profileDetailsContext';
import useUser from '../../hooks/useUser';
import {
  StyledProfileContainer,
  StyledProfile as StyledProfileDetailsForm,
  StyledSaveButtonWrapper,
} from '../../pages/Profile/style';
import { StyledAlert } from '../../styles/UtilityStyles';
import { ProfileDetailsFieldsError } from '../../types/errors';
import { SnackbarType } from '../../types/profileDetails';
import Button from '../Button';
import ImageUploadField from '../ImageUploadField';
import ProfileDetailsFields from '../ProfileDetailsFields';

const ProfileDetailsForm = () => {
  const { user, isUserLoading } = useUser();
  const { profileDetails, setProfileDetails } = useContext(
    ProfileDetailsContext
  );

  const [newProfileDetails, setNewProfileDetails] = useState(profileDetails);
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

    if (!user.id) return;

    const { email, firstName, lastName } = newProfileDetails;

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
    setProfileDetails(newProfileDetails);

    mutate(SWRKeys.user(user.id));
    console.log(profilePicture);
  };

  useEffect(() => {
    if (!user) return;

    setNewProfileDetails({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: {
        id: '',
        name: '',
      },
    });
  }, [user]);

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
            newProfileDetails={newProfileDetails}
            setNewProfileDetails={setNewProfileDetails}
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

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <StyledAlert
          onClose={handleClose}
          severity={snackbarType}
          sx={{ width: '100%' }}
        >
          {submissionMessage}
        </StyledAlert>
      </Snackbar>
    </>
  );
};

export default ProfileDetailsForm;
