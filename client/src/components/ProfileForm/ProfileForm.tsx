import { CircularProgress, Snackbar } from '@mui/material';
import { HttpStatusCode } from 'axios';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { mutate } from 'swr';

import { StyledProfileForm } from './style';
import { updateProfile } from '../../api';
import { SWRKeys } from '../../api/swr';
import { ProfilePictureContext } from '../../contexts/profilePictureContext';
import useUser from '../../hooks/useUser';
import { StyledAlert } from '../../styles/UtilityStyles';
import { IProfileDetails, SnackbarType } from '../../types/profileDetails';
import Input from '../Input';

interface IProfileDetailsProps {
  setProfileDetails: Dispatch<SetStateAction<IProfileDetails>>;
  newProfileDetails: IProfileDetails;
  setNewProfileDetails: Dispatch<SetStateAction<IProfileDetails>>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}

interface IProfileFormErrors {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
}

const ProfileForm = forwardRef<HTMLFormElement, IProfileDetailsProps>(
  (
    {
      setProfileDetails,
      newProfileDetails,
      setNewProfileDetails,
      setIsSubmitting,
    },
    ref
  ) => {
    const { user, isUserLoading } = useUser();

    const [open, setOpen] = useState(false);
    const [error, setError] = useState<IProfileFormErrors>({
      firstName: false,
      lastName: false,
      email: false,
    });
    const [attemptedSave, setAttemptedSave] = useState(false);
    const [snackbarType, setSnackbarType] = useState<SnackbarType>('success');
    const [submissionMessage, setSubmissionMessage] = useState('');

    const noErrors = Object.values(error).every((value) => value === false);

    const emailValidation =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;

    const { profilePictureData } = useContext(ProfilePictureContext);

    const location = useLocation();

    useEffect(() => {
      setOpen(false);
    }, [location]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      // After attempting a save, we want to reset the attemptedSave, but only after all of the highlighted errors have been fixed
      if (noErrors) {
        setAttemptedSave(false);
      }

      const { name, value } = event.target;
      setNewProfileDetails((prevData: IProfileDetails) => ({
        ...prevData,
        [name]: value.trim(),
      }));

      if (!value) {
        setError((prevData: IProfileFormErrors) => ({
          ...prevData,
          [name]: true,
        }));
      } else {
        // Additional validation for email field
        if (name === 'email' && !emailValidation.test(value)) {
          setError((prevData: IProfileFormErrors) => ({
            ...prevData,
            email: true,
          }));
        } else {
          setError((prevData: IProfileFormErrors) => ({
            ...prevData,
            [name]: false,
          }));
        }
      }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!user.id) return;

      const { email, firstName, lastName } = newProfileDetails;

      setIsSubmitting(true);
      setSubmissionMessage('');
      setAttemptedSave(true);

      const response = await updateProfile(user.id, firstName, lastName, email);
      setIsSubmitting(false);
      setOpen(true);
      setSubmissionMessage(response.data.message);

      if (response.status !== HttpStatusCode.Ok) {
        setSnackbarType('error');

        return;
      }

      setSnackbarType('success');
      setProfileDetails({
        ...newProfileDetails,
        profilePicture: profilePictureData,
      });
      mutate(SWRKeys.user(user.id));
    };

    const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };

    if (isUserLoading)
      return <CircularProgress color='primary' sx={{ margin: 'auto' }} />;

    return (
      <StyledProfileForm ref={ref} onSubmit={handleSubmit}>
        <Input
          id='firstName'
          label='First name'
          type='text'
          required
          placeholder='First name'
          name='firstName'
          onChange={handleChange}
          value={newProfileDetails.firstName}
          error={error.firstName && attemptedSave}
        />
        <Input
          id='lastName'
          label='Last name'
          type='text'
          required
          placeholder='Last name'
          name='lastName'
          onChange={handleChange}
          value={newProfileDetails.lastName}
          error={error.lastName && attemptedSave}
        />
        <Input
          id='email'
          label='Email'
          type='email'
          placeholder='Email'
          name='email'
          onChange={handleChange}
          value={newProfileDetails.email}
          error={error.email && attemptedSave}
          errorText='Incorrect email format'
        />

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <StyledAlert
            onClose={handleClose}
            severity={snackbarType}
            sx={{ width: '100%' }}
          >
            {submissionMessage}
          </StyledAlert>
        </Snackbar>
      </StyledProfileForm>
    );
  }
);

export default ProfileForm;
