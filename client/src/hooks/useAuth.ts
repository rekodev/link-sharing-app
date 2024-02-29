import { AxiosError, HttpStatusCode } from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AUTH_FAILURE } from '../constants/auth';
import { LOGIN_PAGE } from '../constants/routes';
import { AuthContext } from '../contexts/authContext';
import { removeAuthToken } from '../utils/authToken';

const useAuth = () => {
  const navigate = useNavigate();
  const { setAuthToken } = useContext(AuthContext);

  const logout = () => {
    setAuthToken('');
    removeAuthToken();
    navigate(LOGIN_PAGE);
  };

  const handleAuthError = (error: AxiosError) => {
    if (!error.response) return;

    if (
      error.response.status === HttpStatusCode.Unauthorized ||
      error.response.status === HttpStatusCode.Forbidden
    ) {
      window.dispatchEvent(new CustomEvent(AUTH_FAILURE));

      logout();
    }
  };

  return { logout, handleAuthError };
};

export default useAuth;
