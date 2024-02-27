import { ReactNode, useState } from "react";
import { AuthContext } from "../../contexts/authContext";

type Props = {
  children: ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  const [authToken, setAuthToken] = useState("");

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthGuard;
