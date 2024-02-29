import { Dispatch, SetStateAction, createContext } from 'react';

interface IAuthContext {
  authToken: string | null;
  setAuthToken: Dispatch<SetStateAction<string | null>>;
  authFailureModalOpen: boolean;
  setAuthFailureModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContext>({
  authToken: '',
  setAuthToken: () => {},
  authFailureModalOpen: false,
  setAuthFailureModalOpen: () => {},
});
