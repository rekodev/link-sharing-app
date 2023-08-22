import { createContext } from 'react';

interface IProfilePictureContext {
  profilePictureData: {
    src: string;
    name: string;
  };
  setProfilePictureData: React.Dispatch<
    React.SetStateAction<{ src: string; name: string }>
  >;
}

export const ProfilePictureContext = createContext<IProfilePictureContext>({
  profilePictureData: {
    src: '',
    name: '',
  },
  setProfilePictureData: () => {},
});
