import { ChangeEvent, FormEvent, useState } from 'react';
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
import axios from 'axios';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState({
    email: false,
    password: false,
    confirmedPassword: false,
  });

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === confirmedPassword) {
      setError((prev) => ({ ...prev, confirmedPassword: false }));
    }

    setPassword(event.target.value);
  };

  const handleConfirmPasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === password) {
      setError((prev) => ({ ...prev, confirmedPassword: false }));
    }

    setConfirmedPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === confirmedPassword) {
      axios.post('http://localhost:5000/api/register', {
        email,
        password,
      });

      return;
    }

    setError((prev) => ({ ...prev, confirmedPassword: true }));
  };

  return (
    <StyledCreateAccountWrapper>
      <StyledCreateAccount>
        <StyledLogoWrapper>
          <img src={devLinksIconLg} alt='DevLinks Large Icon' />
        </StyledLogoWrapper>
        <StyledCreateAccountContainer>
          <h2>Create account</h2>
          <p>Let's get you started sharing your links!</p>
          <StyledForm onSubmit={handleSubmit}>
            <Input
              type='email'
              label='Email address'
              id='email'
              name='email'
              imgSrc={emailIcon}
              imgName='Email Icon'
              placeholder='e.g. alex@email.com'
              onChange={handleEmailInput}
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
              onChange={handlePasswordInput}
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
              onChange={handleConfirmPasswordInput}
              error={error.confirmedPassword}
              errorText='Passwords do not match'
              initialStyle
            />
            <StyledPasswordDisclaimer>
              Password must contain at least 8 characters
            </StyledPasswordDisclaimer>
            {/* <Link to='/links'> */}
            <Button
              text='Create new account'
              variant='contained'
              type='submit'
            />
            {/* </Link> */}
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
