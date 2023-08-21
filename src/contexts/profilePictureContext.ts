import { createContext } from 'react';

interface IProfilePictureContext {
  profilePictureData: string;
  setProfilePictureData: React.Dispatch<React.SetStateAction<string>>;
}

export const ProfilePictureContext = createContext<IProfilePictureContext>({
  profilePictureData: '',
  setProfilePictureData: () => {},
});
