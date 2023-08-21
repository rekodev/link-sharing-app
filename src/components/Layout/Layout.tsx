import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { StyledLayout } from './style';
import { LinkContext } from '../../contexts/linkContext';
import { useState } from 'react';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import { ProfileDetailsContext } from '../../contexts/profileDetailsContext';
import { IProfileDetails } from '../../types/profileDetails';
import { ProfilePictureContext } from '../../contexts/profilePictureContext';

const Layout = () => {
  const [links, setLinks] = useState<[] | IShareableLinkValues[]>([]);
  const [profileDetails, setProfileDetails] = useState<IProfileDetails>({
    firstName: 'Ben',
    lastName: 'Wright',
    email: 'ben@example.com',
    profilePicture: '',
  });
  const [profilePictureData, setProfilePictureData] = useState('');

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
    </StyledLayout>
  );
};

export default Layout;
