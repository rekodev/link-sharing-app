import { forwardRef, useState } from 'react';
import { IProfileDetails } from '../../types/profileDetails';
import Input from '../Input';
import { StyledProfileForm } from './style';

interface IProfileDetailsProps {
  profileDetails: IProfileDetails;
  setProfileDetails: React.Dispatch<React.SetStateAction<IProfileDetails>>;
}

const ProfileForm = forwardRef<HTMLFormElement, IProfileDetailsProps>(
  ({ profileDetails, setProfileDetails }, ref) => {
    const [newProfileDetails, setNewProfileDetails] = useState(profileDetails);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewProfileDetails((prevData: IProfileDetails) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log(profileDetails);
      setProfileDetails(newProfileDetails);
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
        />
        <Input
          id='email'
          label='Email'
          type='email'
          placeholder='Email'
          name='email'
          onChange={handleChange}
          value={newProfileDetails.email}
        />
      </StyledProfileForm>
    );
  }
);

export default ProfileForm;
