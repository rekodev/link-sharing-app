import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import {
  CREATE_ACCOUNT_PAGE,
  LINKS_PAGE,
  LOGIN_PAGE,
  PREVIEW_PAGE,
  PROFILE_PAGE,
} from './constants/routes';
import CreateAccount from './pages/CreateAccount';
import Home from './pages/Home';
import Login from './pages/Login';
import Preview from './pages/Preview';
import Profile from './pages/Profile';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path={LOGIN_PAGE} element={<Login />} />
      <Route path={CREATE_ACCOUNT_PAGE} element={<CreateAccount />} />

      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Navigate to={LINKS_PAGE} replace />} />
        <Route element={<Layout />}>
          <Route path={LINKS_PAGE} element={<Home />} />
          <Route path={PROFILE_PAGE} element={<Profile />} />
          <Route path={PREVIEW_PAGE} element={<Preview />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
