import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { StyledProfileDetailsFieldsContainer } from './style';
import useUser from '../../hooks/useUser';
import { ProfileDetails } from '../../types/profileDetails';
import Input from '../shared/Input';

type ProfileDetailsFieldsError = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
};

type Props = {
  profileDetails: ProfileDetails;
  setProfileDetails: Dispatch<SetStateAction<ProfileDetails>>;
  hasErrors: boolean;
  setHasErrors: Dispatch<SetStateAction<boolean>>;
  error: ProfileDetailsFieldsError;
  setError: Dispatch<SetStateAction<ProfileDetailsFieldsError>>;
};

const ProfileDetailsFields = ({
  profileDetails,
  setProfileDetails,
  hasErrors,
  setHasErrors,
  error,
  setError,
}: Props) => {
  const { user, mutateUser } = useUser();

  const noErrors = Object.values(error).every((value) => value === false);

  const emailValidation =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!user?.id) return;
    // After attempting a save, we want to reset the hasErrors, but only after all of the highlighted errors have been fixed
    if (noErrors) {
      setHasErrors(false);
    }

    const { name, value } = event.target;
    setProfileDetails((prev) => ({ ...prev, [name]: value.trim() }));
    mutateUser(
      {
        ...profileDetails,
        id: user.id,
        [name]: value.trim(),
      },
      false
    );

    if (!value) {
      setError((prevData: ProfileDetailsFieldsError) => ({
        ...prevData,
        [name]: true,
      }));
    } else {
      // Additional validation for email field
      if (name === 'email' && !emailValidation.test(value)) {
        setError((prevData: ProfileDetailsFieldsError) => ({
          ...prevData,
          email: true,
        }));
      } else {
        setError((prevData: ProfileDetailsFieldsError) => ({
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
        value={profileDetails.firstName}
        error={error.firstName && hasErrors}
      />
      <Input
        id='lastName'
        label='Last name'
        type='text'
        required
        placeholder='Last name'
        name='lastName'
        onChange={handleChange}
        value={profileDetails.lastName}
        error={error.lastName && hasErrors}
      />
      <Input
        id='email'
        label='Email'
        type='email'
        placeholder='Email'
        name='email'
        onChange={handleChange}
        value={profileDetails.email}
        error={error.email && hasErrors}
        errorText='Incorrect email format'
      />
    </StyledProfileDetailsFieldsContainer>
  );
};

export default ProfileDetailsFields;
