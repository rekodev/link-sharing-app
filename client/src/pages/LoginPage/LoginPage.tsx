import { Typography } from '@mui/material';
import { HttpStatusCode } from 'axios';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

import {
  StyledAccountCreationTextWrapper,
  StyledForm,
  StyledLogin,
  StyledLoginContainer,
  StyledLoginWrapper,
  StyledLogoWrapper,
} from './style';
import { login } from '../../api';
import { SWRKeys } from '../../api/swr';
import emailIcon from '../../assets/images/icon-email.svg';
import passwordIcon from '../../assets/images/icon-password.svg';
import devLinksIconLg from '../../assets/images/logo-devlinks-large.svg';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import { LINKS_PAGE } from '../../constants/routes';
import { AuthContext } from '../../contexts/authContext';
import { themeColors } from '../../styles/Theme';
import { decodeAuthToken, setAuthToken } from '../../utils/authToken';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuthToken: setAuthTokenState } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setSubmissionMessage('');

    const response = await login(email, password);

    setIsLoading(false);
    setSubmissionMessage(response.data.message);

    if (response.status !== HttpStatusCode.Ok) {
      setSubmissionSuccess(false);

      return;
    }

    const authToken = response.data.accessToken;

    setAuthToken(authToken);
    setAuthTokenState(authToken);
    const userId = decodeAuthToken(authToken).userId;

    if (userId) {
      mutate(SWRKeys.user(userId));
    }

    setSubmissionSuccess(true);
    navigate(LINKS_PAGE);
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
            {
              <Typography
                fontSize={14}
                role='alert'
                display={submissionMessage ? 'initial' : 'none'}
                color={
                  submissionSuccess ? themeColors.success : themeColors.red
                }
              >
                {submissionMessage}
              </Typography>
            }
            <Button
              text='Login'
              variant='contained'
              type='submit'
              isLoading={isLoading}
            />
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

export default LoginPage;
