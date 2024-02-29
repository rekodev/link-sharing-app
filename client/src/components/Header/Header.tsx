import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  StyledHeader,
  StyledHeaderContainer,
  StyledLinks,
  StyledPreviewAndLogout,
  StyledPurpleRectangle,
} from './style';
import iconLinksHeader from '../../assets/images/icon-links-header.svg';
import iconPreviewHeader from '../../assets/images/icon-preview-header.svg';
import iconProfileDetailsHeader from '../../assets/images/icon-profile-details-header.svg';
import devLinksIconLg from '../../assets/images/logo-devlinks-large.svg';
import devLinksIconSm from '../../assets/images/logo-devlinks-small.svg';
import { LINKS_PAGE, PREVIEW_PAGE, PROFILE_PAGE } from '../../constants/routes';
import { CopiedLinkContext } from '../../contexts/copiedLinkContext';
import Button from '../Button';
import LogoutButton from '../LogoutButton';

const Header = () => {
  const [activeButtons, setActiveButtons] = useState({
    links: false,
    profile: false,
  });

  const { setCopiedLink } = useContext(CopiedLinkContext);

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case PROFILE_PAGE:
        setActiveButtons({ links: false, profile: true });
        break;
      case LINKS_PAGE:
        setActiveButtons({ links: true, profile: false });
        break;
      default:
        break;
    }
  }, [location.pathname]);

  const handleProfileButtonClick = () => {
    setActiveButtons({ links: false, profile: true });
  };
  const handleLinksButtonClick = () => {
    setActiveButtons({ links: true, profile: false });
  };

  const handleClick = () => {
    setCopiedLink(true);
    navigator.clipboard.writeText(location.pathname);
  };

  if (location.pathname === PREVIEW_PAGE) {
    return (
      <>
        <StyledPurpleRectangle />
        <StyledHeader>
          <StyledHeaderContainer>
            <Link to={activeButtons.links ? LINKS_PAGE : PROFILE_PAGE}>
              <Button text='Back to Editor' variant='outlined' />
            </Link>
            <Button
              text='Share Link'
              variant='contained'
              onClick={handleClick}
            />
          </StyledHeaderContainer>
        </StyledHeader>
      </>
    );
  }

  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <Link to='/'>
          <img
            src={devLinksIconSm}
            className='small-logo'
            alt='Small Dev Links Icon'
          />
          <img
            src={devLinksIconLg}
            className='large-logo'
            alt='Large Dev Links Icon'
          />
        </Link>
        <StyledLinks>
          <Link to={LINKS_PAGE}>
            <Button
              imgSrc={iconLinksHeader}
              text='Links'
              hideOnMobile
              onClick={handleLinksButtonClick}
              active={activeButtons.links}
            />
          </Link>
          <Link to={PROFILE_PAGE}>
            <Button
              imgSrc={iconProfileDetailsHeader}
              text='Profile Details'
              hideOnMobile
              onClick={handleProfileButtonClick}
              active={activeButtons.profile}
            />
          </Link>
        </StyledLinks>
        <StyledPreviewAndLogout>
          <Link to={PREVIEW_PAGE}>
            <Button
              imgSrc={iconPreviewHeader}
              text='Preview'
              variant='outlined'
              hideOnMobile
              hideOnTablet
            />
          </Link>
          <LogoutButton />
        </StyledPreviewAndLogout>
      </StyledHeaderContainer>
    </StyledHeader>
  );
};

export default Header;
