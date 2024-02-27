import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {
  StyledAccountCreationTextWrapper,
  StyledForm,
  StyledLogin,
  StyledLoginContainer,
  StyledLoginWrapper,
  StyledLogoWrapper,
} from "./style";
import passwordIcon from "../../assets/images/icon-password.svg";
import emailIcon from "../../assets/images/icon-email.svg";
import devLinksIconLg from "../../assets/images/logo-devlinks-large.svg";
import { Typography } from "@mui/material";
import { login } from "../../api";
import { HttpStatusCode } from "axios";
import { themeColors } from "../../styles/Theme";
import { mutate } from "swr";
import { SWRKeys } from "../../api/swr";
import { AuthContext } from "../../contexts/authContext";
import { LINKS_PAGE } from "../../constants/routes";
import decodeAccessToken from "../../utils/decodeAccessToken";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    navigate(LINKS_PAGE);
  }, [navigate, isAuthenticated]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setSubmissionMessage("");

    const response = await login(email, password);

    setIsLoading(false);
    setSubmissionMessage(response.data.message);

    if (response.status !== HttpStatusCode.Ok) {
      setSubmissionSuccess(false);
      setIsAuthenticated(false);

      return;
    }

    const accessToken = response.data.accessToken;

    localStorage.setItem("accessToken", accessToken);
    const userId = decodeAccessToken(accessToken).userId;

    console.log(userId);

    if (userId) {
      mutate(SWRKeys.user(userId));
    }

    setSubmissionSuccess(true);
    setIsAuthenticated(true);
    navigate(LINKS_PAGE);
  };

  return (
    <StyledLoginWrapper>
      <StyledLogin>
        <StyledLogoWrapper>
          <img src={devLinksIconLg} alt="DevLinks Large Icon" />
        </StyledLogoWrapper>
        <StyledLoginContainer>
          <div></div>
          <h2>Login</h2>
          <p>Add your details below to get back into the app</p>
          <StyledForm onSubmit={handleSubmit}>
            <Input
              type="email"
              label="Email address"
              id="email"
              name="email"
              imgSrc={emailIcon}
              imgName="Email Icon"
              placeholder="e.g. alex@email.com"
              initialStyle
              onChange={handleEmailChange}
            />
            <Input
              type="password"
              label="Password"
              id="password"
              name="password"
              imgSrc={passwordIcon}
              imgName="Password Icon"
              placeholder="Enter your password"
              initialStyle
              onChange={handlePasswordChange}
            />
            {
              <Typography
                fontSize={14}
                role="alert"
                display={submissionMessage ? "initial" : "none"}
                color={
                  submissionSuccess ? themeColors.success : themeColors.red
                }
              >
                {submissionMessage}
              </Typography>
            }
            <Button
              text="Login"
              variant="contained"
              type="submit"
              isLoading={isLoading}
            />
          </StyledForm>
          <StyledAccountCreationTextWrapper>
            <p>Don't have an account?</p>
            <Link to="create-account">Create account</Link>
          </StyledAccountCreationTextWrapper>
        </StyledLoginContainer>
      </StyledLogin>
    </StyledLoginWrapper>
  );
};

export default Login;
