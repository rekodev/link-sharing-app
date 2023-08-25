import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Preview from './pages/Preview';
import Profile from './pages/Profile';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/create-account' element={<CreateAccount />} />

        <Route element={<Layout />}>
          <Route path='/links' element={<Home />} />
          <Route path='/preview' element={<Preview />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
