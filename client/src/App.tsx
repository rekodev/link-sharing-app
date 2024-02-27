import { AxiosError, HttpStatusCode } from 'axios';
import { SWRConfig } from 'swr';

import fetcher from './api/swr';
import AuthProvider from './components/AuthProvider';
import useLogout from './hooks/useLogout';
import RoutesComponent from './Routes';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  const logout = useLogout();

  const handleError = (error: AxiosError) => {
    if (
      error.status === HttpStatusCode.Unauthorized ||
      error.status === HttpStatusCode.Forbidden
    ) {
      logout();
    }
  };

  return (
    <SWRConfig value={{ fetcher, onError: handleError }}>
      <GlobalStyles />
      <AuthProvider>
        <RoutesComponent />
      </AuthProvider>
    </SWRConfig>
  );
}

export default App;
