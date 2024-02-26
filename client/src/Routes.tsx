import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Preview from "./pages/Preview";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import { LINKS_PAGE, LOGIN_PAGE } from "./constants/routes";
import { useContext } from "react";
import { AuthContext } from "./contexts/authContext";

const RoutesComponent = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={LINKS_PAGE} />
            ) : (
              <Navigate to={LOGIN_PAGE} />
            )
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to={LINKS_PAGE} /> : <Login />}
        />
        <Route path="/create-account" element={<CreateAccount />} />

        <Route element={<Layout />}>
          <Route path="/links" element={<Home />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
