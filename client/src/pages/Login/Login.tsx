import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {
  StyledAccountCreationTextWrapper,
  StyledForm,
  StyledLogin,
  StyledLoginContainer,
  StyledLoginWrapper,
  StyledLogoWrapper,
} from './style';
import passwordIcon from '../../assets/images/icon-password.svg';
import emailIcon from '../../assets/images/icon-email.svg';
import devLinksIconLg from '../../assets/images/logo-devlinks-large.svg';
import { HttpStatusCode } from 'axios';
import httpClient from '../../api/httpClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await httpClient.createUser(email, password);

    if (response.status === HttpStatusCode.Created) {
      return 'hi';
    }

    alert('error');
    throw new Error('Error creating user');
  };

  return (
    <StyledLoginWrapper>
      <StyledLogin>
        <StyledLogoWrapper>
          <img src={devLinksIconLg} alt='DevLinks Large Icon' />
        </StyledLogoWrapper>
        <StyledLoginContainer>
          <div></div>
          <h2>Login</h2>
          <p>Add your details below to get back into the app</p>
          <StyledForm onSubmit={handleSubmit}>
            <Input
              type='email'
              label='Email address'
              id='email'
              name='email'
              imgSrc={emailIcon}
              imgName='Email Icon'
              placeholder='e.g. alex@email.com'
              initialStyle
              onChange={handleEmailChange}
            />
            <Input
              type='password'
              label='Password'
              id='password'
              name='password'
              imgSrc={passwordIcon}
              imgName='Password Icon'
              placeholder='Enter your password'
              initialStyle
              onChange={handlePasswordChange}
            />

            {/* <Button text='Login' variant='contained' type='submit' /> */}
            <Button text='Create account' variant='contained' type='submit' />
          </StyledForm>
          <StyledAccountCreationTextWrapper>
            <p>Don't have an account?</p>
            <Link to='create-account'>Create account</Link>
          </StyledAccountCreationTextWrapper>
        </StyledLoginContainer>
      </StyledLogin>
    </StyledLoginWrapper>
  );
};

export default Login;
