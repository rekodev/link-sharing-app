import AuthProvider from "./components/providers/AuthProvider";
import SWRConfigProvider from "./components/providers/SWRConfigProvider/";
import RoutesComponent from "./Routes";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <AuthProvider>
      <GlobalStyles />

      <SWRConfigProvider>
        <RoutesComponent />
      </SWRConfigProvider>
    </AuthProvider>
  );
}

export default App;
