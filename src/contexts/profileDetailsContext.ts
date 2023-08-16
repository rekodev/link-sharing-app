import { createContext } from 'react';
import { IProfileDetails } from '../types/profileDetails';

interface IProfileDetailsContext {
  profileDetails: IProfileDetails;
  setProfileDetails: React.Dispatch<React.SetStateAction<IProfileDetails>>;
}

export const ProfileDetailsContext = createContext<IProfileDetailsContext>({
  profileDetails: { firstName: '', lastName: '', email: '' },
  setProfileDetails: () => {},
});
