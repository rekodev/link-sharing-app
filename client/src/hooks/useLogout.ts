import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LOGIN_PAGE } from "../constants/routes";
import { AuthContext } from "../contexts/authContext";

const useLogout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    navigate(LOGIN_PAGE);
  };

  return logout;
};

export default useLogout;
