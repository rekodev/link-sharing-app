import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import iconLinksHeader from '../../assets/images/icon-links-header.svg';
import iconPreviewHeader from '../../assets/images/icon-preview-header.svg';
import iconProfileDetailsHeader from '../../assets/images/icon-profile-details-header.svg';
import devLinksIconLg from '../../assets/images/logo-devlinks-large.svg';
import devLinksIconSm from '../../assets/images/logo-devlinks-small.svg';
import { CopiedLinkContext } from '../../contexts/copiedLinkContext';
import Button from '../Button';
import {
  StyledHeader,
  StyledHeaderContainer,
  StyledLinks,
  StyledPurpleRectangle,
} from './style';

const Header = () => {
  const [activeButtons, setActiveButtons] = useState({
    links: false,
    profile: false,
  });

  const { setCopiedLink } = useContext(CopiedLinkContext);

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/profile':
        setActiveButtons({ links: false, profile: true });
        break;
      case '/links':
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

  if (location.pathname === '/preview') {
    return (
      <>
        <StyledPurpleRectangle />
        <StyledHeader>
          <StyledHeaderContainer>
            <Link to={activeButtons.links ? '/links' : '/profile'}>
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
          <Link to='/links'>
            <Button
              imgSrc={iconLinksHeader}
              text='Links'
              hideOnMobile
              onClick={handleLinksButtonClick}
              active={activeButtons.links}
            />
          </Link>
          <Link to='/profile'>
            <Button
              imgSrc={iconProfileDetailsHeader}
              text='Profile Details'
              hideOnMobile
              onClick={handleProfileButtonClick}
              active={activeButtons.profile}
            />
          </Link>
        </StyledLinks>
        <Link to='/preview'>
          <Button
            imgSrc={iconPreviewHeader}
            text='Preview'
            variant='outlined'
            hideOnMobile
          />
        </Link>
      </StyledHeaderContainer>
    </StyledHeader>
  );
};

export default Header;
