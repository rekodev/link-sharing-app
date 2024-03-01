import { ReactNode, useEffect, useState } from 'react';

import { AUTH_FAILURE } from '../../constants/auth';
import { AuthContext } from '../../contexts/authContext';
import { getAuthToken } from '../../utils/authToken';
import AuthFailureModal from '../AuthFailureModal';

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [authToken, setAuthToken] = useState(getAuthToken());
  const [authFailureModalOpen, setAuthFailureModalOpen] = useState(false);

  useEffect(() => {
    const handleAuthFailure = () => setAuthFailureModalOpen(true);

    window.addEventListener(AUTH_FAILURE, handleAuthFailure);

    return () => window.removeEventListener(AUTH_FAILURE, handleAuthFailure);
  }, []);

  const handleClose = () => setAuthFailureModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken,
        authFailureModalOpen,
        setAuthFailureModalOpen,
      }}
    >
      {children}
      <AuthFailureModal open={authFailureModalOpen} onClose={handleClose} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
