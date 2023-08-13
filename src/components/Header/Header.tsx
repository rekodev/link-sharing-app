import { StyledHeader, StyledHeaderContainer, StyledLinks } from './style';
import Button from '../Button';
import devLinksIconSm from '../../assets/images/logo-devlinks-small.svg';
import iconLinksHeader from '../../assets/images/icon-links-header.svg';
import iconPreviewHeader from '../../assets/images/icon-preview-header.svg';
import iconProfileDetailsHeader from '../../assets/images/icon-profile-details-header.svg';

const Header = () => {
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
        <Button
          imgSrc={iconPreviewHeader}
          text='Preview'
          variant='outlined'
          hideOnMobile
        />
      </StyledHeaderContainer>
    </StyledHeader>
  );
};

export default Header;
