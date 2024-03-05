import { createContext } from 'react';

import { ProfileDetails } from '../types/profileDetails';

interface ProfileDetailsContext {
  profileDetails: ProfileDetails;
  setProfileDetails: React.Dispatch<React.SetStateAction<ProfileDetails>>;
}

export const ProfileDetailsContext = createContext<ProfileDetailsContext>({
  profileDetails: {
    firstName: '',
    lastName: '',
    email: '',
    profilePicture: {
      id: '',
      name: '',
    },
  },
  setProfileDetails: () => {},
});
