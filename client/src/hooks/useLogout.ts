import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { LOGIN_PAGE } from '../constants/routes';
import { AuthContext } from '../contexts/authContext';
import { removeAuthToken } from '../utils/authToken';

const useLogout = () => {
  const navigate = useNavigate();
  const { setAuthToken } = useContext(AuthContext);

  const logout = () => {
    setAuthToken('');
    removeAuthToken();
    navigate(LOGIN_PAGE);
  };

  return logout;
};

export default useLogout;
