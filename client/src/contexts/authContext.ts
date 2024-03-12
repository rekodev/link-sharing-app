import { Dispatch, SetStateAction, createContext } from 'react';

type AuthContextType = {
  authToken: string | null;
  setAuthToken: Dispatch<SetStateAction<string | null>>;
  authFailureModalOpen: boolean;
  setAuthFailureModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({
  authToken: '',
  setAuthToken: () => {},
  authFailureModalOpen: false,
  setAuthFailureModalOpen: () => {},
});
