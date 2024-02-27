import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { LOGIN_PAGE } from '../../constants/routes';
import { AuthContext } from '../../contexts/authContext';

const ProtectedRoute = () => {
  const { authToken } = useContext(AuthContext);

  if (!authToken) {
    return <Navigate to={LOGIN_PAGE} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
