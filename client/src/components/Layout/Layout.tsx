import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CopiedLinkContext } from '../../contexts/copiedLinkContext';
import { LinkContext } from '../../contexts/linkContext';
import { ProfileDetailsContext } from '../../contexts/profileDetailsContext';
import { ProfilePictureContext } from '../../contexts/profilePictureContext';
import { IProfileDetails } from '../../types/profileDetails';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import Footer from '../Footer';
import Header from '../Header';
import { StyledLayout } from './style';

const Layout = () => {
  const [links, setLinks] = useState<[] | IShareableLinkValues[]>([]);
  const [profileDetails, setProfileDetails] = useState<IProfileDetails>({
    firstName: 'Ben',
    lastName: 'Wright',
    email: 'ben@example.com',
    profilePicture: {
      src: '',
      name: '',
    },
  });
  const [profilePictureData, setProfilePictureData] = useState({
    src: '',
    name: '',
  });
  const [copiedLink, setCopiedLink] = useState(false);

  return (
    <StyledLayout>
      <CopiedLinkContext.Provider
        value={{ copiedLink: copiedLink, setCopiedLink: setCopiedLink }}
      >
        <Header />
        <main>
          <LinkContext.Provider
            value={{
              links: links,
              setLinks: setLinks,
            }}
          >
            <ProfilePictureContext.Provider
              value={{
                profilePictureData: profilePictureData,
                setProfilePictureData: setProfilePictureData,
              }}
            >
              <ProfileDetailsContext.Provider
                value={{
                  profileDetails: profileDetails,
                  setProfileDetails: setProfileDetails,
                }}
              >
                <Outlet />
              </ProfileDetailsContext.Provider>
            </ProfilePictureContext.Provider>
          </LinkContext.Provider>
        </main>
        <Footer />
      </CopiedLinkContext.Provider>
    </StyledLayout>
  );
};

export default Layout;
