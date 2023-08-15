import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Preview from './pages/Preview';

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/preview' element={<Preview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
