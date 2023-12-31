import { Snackbar } from '@mui/material';
import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfilePictureContext } from '../../contexts/profilePictureContext';
import { StyledAlert } from '../../styles/UtilityStyles';
import { IProfileDetails, SnackbarType } from '../../types/profileDetails';
import Input from '../Input';
import { StyledProfileForm } from './style';

interface IProfileDetailsProps {
  setProfileDetails: React.Dispatch<React.SetStateAction<IProfileDetails>>;
  newProfileDetails: IProfileDetails;
  setNewProfileDetails: React.Dispatch<React.SetStateAction<IProfileDetails>>
}

interface IProfileFormErrors {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
}

const ProfileForm = forwardRef<HTMLFormElement, IProfileDetailsProps>(
  ({ setProfileDetails, newProfileDetails, setNewProfileDetails }, ref) => {

    const [open, setOpen] = useState(false);
    const [error, setError] = useState<IProfileFormErrors>({
      firstName: false,
      lastName: false,
      email: false,
    });
    const [attemptedSave, setAttemptedSave] = useState(false);
    const [snackbarType, setSnackbarType] = useState<SnackbarType>('success');

    const noErrors = Object.values(error).every((value) => value === false);

    const emailValidation =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;

    const { profilePictureData } = useContext(ProfilePictureContext);

    const location = useLocation();

    useEffect(() => {
      setOpen(false);
    }, [location]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // After attempting a save, we want to reset the attemptedSave, but only after all of the highlighted errors have been fixed
      if (noErrors) {
        setAttemptedSave(false);
      }

      const { name, value } = e.target;
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(error);

      setAttemptedSave(true);

      if (noErrors) {
        setSnackbarType('success');
        setOpen(true);

        setProfileDetails({
          ...newProfileDetails,
          profilePicture: profilePictureData,
        });
      } else {
        setSnackbarType('error');
        setOpen(true);
      }
    };

    const handleClose = (
      _event?: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };

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
            {snackbarType === 'success'
              ? 'Saved successfully'
              : 'Oops! Some fields need attention'}
          </StyledAlert>
        </Snackbar>
      </StyledProfileForm>
    );
  }
);

export default ProfileForm;
