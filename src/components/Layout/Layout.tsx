import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { StyledLayout } from './style';
import { LinkContext } from '../../contexts/linkContext';
import { useState } from 'react';
import { IShareableLinkValues } from '../../types/shareableLinkValues';

const Layout = () => {
  const [links, setLinks] = useState<[] | IShareableLinkValues[]>([]);

  return (
    <StyledLayout>
      <Header />
      <main>
        <LinkContext.Provider
          value={{
            links: links,
            setLinks: setLinks,
          }}
        >
          <Outlet />
        </LinkContext.Provider>
      </main>
      <Footer />
    </StyledLayout>
  );
};

export default Layout;
