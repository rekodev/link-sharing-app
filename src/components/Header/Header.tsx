import { StyledHeader, StyledHeaderContainer, StyledLinks } from './style';
import Button from '../Button';
import devLinksIconSm from '../../assets/images/logo-devlinks-small.svg';
import iconLinksHeader from '../../assets/images/icon-links-header.svg';
import iconPreviewHeader from '../../assets/images/icon-preview-header.svg';
import iconProfileDetailsHeader from '../../assets/images/icon-profile-details-header.svg';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  if (location.pathname === '/preview') {
    return (
      <StyledHeader>
        <StyledHeaderContainer>
          <Link to='/'>
            <Button text='Back to Editor' variant='outlined' />
          </Link>
          <Button text='Share Link' variant='contained' />
        </StyledHeaderContainer>
      </StyledHeader>
    );
  }

  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <img src={devLinksIconSm} alt='Small Dev Links Icon' />
        <StyledLinks>
          <Button imgSrc={iconLinksHeader} text='Links' hideOnMobile />
          <Button
            imgSrc={iconProfileDetailsHeader}
            text='Profile Details'
            hideOnMobile
          />
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
