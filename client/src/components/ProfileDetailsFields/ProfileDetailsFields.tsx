import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { StyledProfileDetailsFieldsContainer } from './style';
import { ProfileDetailsFieldsError } from '../../types/errors';
import { ProfileDetails } from '../../types/profileDetails';
import Input from '../Input';

type Props = {
  newProfileDetails: ProfileDetails;
  setNewProfileDetails: Dispatch<SetStateAction<ProfileDetails>>;
  attemptedSave: boolean;
  setAttemptedSave: Dispatch<SetStateAction<boolean>>;
  error: ProfileDetailsFieldsError;
  setError: Dispatch<SetStateAction<ProfileDetailsFieldsError>>;
};

interface IProfileFormErrors {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
}

const ProfileDetailsFields = ({
  newProfileDetails,
  setNewProfileDetails,
  attemptedSave,
  setAttemptedSave,
  error,
  setError,
}: Props) => {
  const noErrors = Object.values(error).every((value) => value === false);

  const emailValidation =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // After attempting a save, we want to reset the attemptedSave, but only after all of the highlighted errors have been fixed
    if (noErrors) {
      setAttemptedSave(false);
    }

    const { name, value } = event.target;
    setNewProfileDetails((prevData: ProfileDetails) => ({
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

  return (
    <StyledProfileDetailsFieldsContainer>
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
    </StyledProfileDetailsFieldsContainer>
  );
};

export default ProfileDetailsFields;
