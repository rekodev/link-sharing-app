import { createContext } from 'react';

interface IProfilePictureContext {
  profilePictureData: {
    id: string;
    name: string;
  };
  setProfilePictureData: React.Dispatch<
    React.SetStateAction<{ src: string; name: string }>
  >;
}

export const ProfilePictureContext = createContext<IProfilePictureContext>({
  profilePictureData: {
    id: '',
    name: '',
  },
  setProfilePictureData: () => {},
});
