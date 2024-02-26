import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import useLogout from "../../hooks/useLogout";

type Props = {
  children: ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const logout = useLogout();

  useEffect(() => {
    if (isAuthenticated) return;

    // logout();
  }, [logout, isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthGuard;
