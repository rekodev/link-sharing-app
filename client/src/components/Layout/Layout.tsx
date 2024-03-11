import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import { StyledLayout } from './style';
import { CopiedLinkContext } from '../../contexts/copiedLinkContext';

const Layout = () => {
  const [copiedLink, setCopiedLink] = useState(false);

  return (
    <StyledLayout>
      <CopiedLinkContext.Provider value={{ copiedLink, setCopiedLink }}>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </CopiedLinkContext.Provider>
    </StyledLayout>
  );
};

export default Layout;
