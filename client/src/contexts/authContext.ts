import { Dispatch, SetStateAction, createContext } from "react";

interface IAuthContext {
  authToken: string;
  setAuthToken: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<IAuthContext>({
  authToken: "",
  setAuthToken: () => {},
});
