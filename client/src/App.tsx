import { SWRConfig } from 'swr';

import fetcher from './api/swr';
import AuthProvider from './components/AuthProvider';
import useAuth from './hooks/useAuth';
import RoutesComponent from './Routes';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  const { handleAuthError } = useAuth();

  return (
    <AuthProvider>
      <GlobalStyles />
      <SWRConfig value={{ fetcher, onError: handleAuthError }}>
        <RoutesComponent />
      </SWRConfig>
    </AuthProvider>
  );
}

export default App;
