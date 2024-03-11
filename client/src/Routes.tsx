import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import {
  CREATE_ACCOUNT_PAGE,
  LINKS_PAGE,
  LOGIN_PAGE,
  PREVIEW_PAGE,
  PROFILE_DETAILS_PAGE,
} from './constants/routes';
import CreateAccountPage from './pages/CreateAccountPage';
import LinksPage from './pages/LinksPage';
import LoginPage from './pages/LoginPage';
import PreviewPage from './pages/PreviewPage';
import ProfileDetailsPage from './pages/ProfileDetailsPage';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path={LOGIN_PAGE} element={<LoginPage />} />
      <Route path={CREATE_ACCOUNT_PAGE} element={<CreateAccountPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Navigate to={LINKS_PAGE} replace />} />
        <Route element={<Layout />}>
          <Route path={LINKS_PAGE} element={<LinksPage />} />
          <Route path={PROFILE_DETAILS_PAGE} element={<ProfileDetailsPage />} />
          <Route path={PREVIEW_PAGE} element={<PreviewPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
