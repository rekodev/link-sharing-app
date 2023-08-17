import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {
  StyledAccountCreationTextWrapper,
  StyledForm,
  StyledLogin,
  StyledLoginContainer,
  StyledLogoWrapper,
} from './style';
import passwordIcon from '../../assets/images/icon-password.svg';
import emailIcon from '../../assets/images/icon-email.svg';
import devLinksIconLg from '../../assets/images/logo-devlinks-large.svg';

const Login = () => {
  return (
    <StyledLogin>
      <StyledLogoWrapper>
        <img src={devLinksIconLg} alt='DevLinks Large Icon' />
      </StyledLogoWrapper>
      <StyledLoginContainer>
        <div></div>
        <h2>Login</h2>
        <p>Add your details below to get back into the app</p>
        <StyledForm>
          <Input
            type='email'
            label='Email address'
            id='email'
            name='email'
            imgSrc={emailIcon}
            imgName='Email Icon'
            placeholder='e.g. alex@email.com'
          />
          <Input
            type='password'
            label='Password'
            id='password'
            name='password'
            imgSrc={passwordIcon}
            imgName='Password Icon'
            placeholder='Enter your password'
          />
          <Link to='/links'>
            <Button text='Login' variant='contained' type='submit' />
          </Link>
        </StyledForm>

        <StyledAccountCreationTextWrapper>
          <p>Don't have an account?</p>
          <Link to='create-account'>Create account</Link>
        </StyledAccountCreationTextWrapper>
      </StyledLoginContainer>
    </StyledLogin>
  );
};

export default Login;
