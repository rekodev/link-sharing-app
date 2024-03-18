import { ProfileDetails } from '../types/profileDetails';

export const validateProfileDetails = (profileDetails: ProfileDetails) => {
  const { email, firstName, lastName } = profileDetails;

  if (!email || !firstName || !lastName) return false;

  const emailValidation =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;

  if (!emailValidation.test(email)) return false;

  return true;
};
