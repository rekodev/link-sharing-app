import { ReactNode, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/authContext';
import { getAuthToken } from '../../utils/authToken';

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    const accessToken = getAuthToken();

    if (accessToken) {
      setAuthToken(accessToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
