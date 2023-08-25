import { Link } from 'react-router-dom';
import emailIcon from '../../assets/images/icon-email.svg';
import passwordIcon from '../../assets/images/icon-password.svg';
import devLinksIconLg from '../../assets/images/logo-devlinks-large.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {
  StyledAccountCreationTextWrapper,
  StyledCreateAccount,
  StyledCreateAccountContainer,
  StyledCreateAccountWrapper,
  StyledForm,
  StyledLogoWrapper,
  StyledPasswordDisclaimer,
} from './style';

const CreateAccount = () => {
  return (
    <StyledCreateAccountWrapper>
      <StyledCreateAccount>
        <StyledLogoWrapper>
          <img src={devLinksIconLg} alt='DevLinks Large Icon' />
        </StyledLogoWrapper>
        <StyledCreateAccountContainer>
          <h2>Create account</h2>
          <p>Let's get you started sharing your links!</p>
          <StyledForm>
            <Input
              type='email'
              label='Email address'
              id='email'
              name='email'
              imgSrc={emailIcon}
              imgName='Email Icon'
              placeholder='e.g. alex@email.com'
              initialStyle
            />
            <Input
              type='password'
              label='Password'
              id='password'
              name='password'
              imgSrc={passwordIcon}
              imgName='Password Icon'
              placeholder='At least 8 characters'
              initialStyle
            />
            <Input
              type='password'
              label='Confirm password'
              id='confirm-password'
              name='confirm-password'
              imgSrc={passwordIcon}
              imgName='Password Icon'
              placeholder='At least 8 characters'
              initialStyle
            />
            <StyledPasswordDisclaimer>
              Password must contain at least 8 characters
            </StyledPasswordDisclaimer>
            <Link to='/links'>
              <Button
                text='Create new account'
                variant='contained'
                type='submit'
              />
            </Link>
          </StyledForm>

          <StyledAccountCreationTextWrapper>
            <p>Already have an account?</p>
            <Link to='/'>Login</Link>
          </StyledAccountCreationTextWrapper>
        </StyledCreateAccountContainer>
      </StyledCreateAccount>
    </StyledCreateAccountWrapper>
  );
};

export default CreateAccount;
