import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { StyledLayout } from './style';

const Layout = () => {
  return (
    <StyledLayout>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </StyledLayout>
  );
};

export default Layout;
