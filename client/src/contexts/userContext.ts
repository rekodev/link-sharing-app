import { Dispatch, SetStateAction, createContext } from 'react';
import { UserModel } from '../types/user';

type UserContext = {
  user: UserModel;
  setUser: Dispatch<SetStateAction<UserModel>>;
};

export const UserContext = createContext<UserContext>({
  user: {
    id: null,
    email: '',
    firstName: '',
    lastName: '',
    profilePictureUrl: '',
    createdAt: '',
    updatedAt: '',
  },
  setUser: () => {},
});
