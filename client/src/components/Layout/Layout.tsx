import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { StyledLayout } from './style';
import { CopiedLinkContext } from '../../contexts/copiedLinkContext';
import { LinkContext } from '../../contexts/linkContext';
import { ProfileDetailsContext } from '../../contexts/profileDetailsContext';
import { UserContext } from '../../contexts/userContext';
import { IProfileDetails } from '../../types/profileDetails';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import { UserModel } from '../../types/user';
import Footer from '../Footer';
import Header from '../Header';

const Layout = () => {
  const [user, setUser] = useState<UserModel>({
    id: null,
    email: '',
    firstName: '',
    lastName: '',
    profilePictureUrl: '',
    createdAt: '',
    updatedAt: '',
  });
  const [links, setLinks] = useState<[] | IShareableLinkValues[]>([]);
  const [profileDetails, setProfileDetails] = useState<IProfileDetails>({
    firstName: 'Ben',
    lastName: 'Wright',
    email: 'ben@example.com',
    profilePicture: {
      id: '',
      name: '',
    },
  });

  const [copiedLink, setCopiedLink] = useState(false);

  return (
    <StyledLayout>
      <CopiedLinkContext.Provider value={{ copiedLink, setCopiedLink }}>
        <Header />
        <main>
          <UserContext.Provider value={{ user, setUser }}>
            <ProfileDetailsContext.Provider
              value={{ profileDetails, setProfileDetails }}
            >
              <LinkContext.Provider value={{ links, setLinks }}>
                <Outlet />
              </LinkContext.Provider>
            </ProfileDetailsContext.Provider>
          </UserContext.Provider>
        </main>
        <Footer />
      </CopiedLinkContext.Provider>
    </StyledLayout>
  );
};

export default Layout;
