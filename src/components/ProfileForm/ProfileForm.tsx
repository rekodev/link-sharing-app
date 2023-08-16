import { Box, TextField } from '@mui/material';
import { forwardRef } from 'react';
import { IProfileForm } from '../../types/profileForm';
import { StyledProfileForm } from './style';

interface IProfileFormProps {
  formData: IProfileForm;
  setFormData: React.Dispatch<React.SetStateAction<IProfileForm>>;
}

const ProfileForm = forwardRef<HTMLFormElement, IProfileFormProps>(
  ({ formData, setFormData }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData: IProfileForm) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log(formData);
    };

    return (
      <StyledProfileForm ref={ref} onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label='First Name'
            variant='outlined'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label='Last Name'
            variant='outlined'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label='Email'
            variant='outlined'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
          />
        </Box>
      </StyledProfileForm>
    );
  }
);

export default ProfileForm;
