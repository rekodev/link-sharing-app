import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';
import Input from '../../components/Input';
import { Breakpoints } from '../../styles/Breakpoints';

export const StyledLoginWrapper = styled.main`
  @media screen and (min-width: ${Breakpoints.Tablet}) {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledLogin = styled.section`
  padding: 2rem;

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    padding: 0;
    min-width: 480px;
    max-width: 480px;
  }
`;

export const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;

  > p {
    margin-top: 0.5rem;
    color: ${themeColors.darkGray};
  }

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    background-color: #fff;
    padding: 40px;
    margin: auto auto;
    border-radius: 0.75rem;

    h2 {
      font-size: 2rem;
    }
  }
`;

export const StyledLogoWrapper = styled.div`
  height: 2.5rem;
  margin-bottom: 4rem;
  width: 180px;

  img {
    height: 100%;
  }

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    margin: 0 auto 52px auto;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  margin-top: 2.5rem;

  button {
    width: 100%;
  }
`;

export const StyledAccountCreationTextWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  p {
    color: ${themeColors.darkGray};
  }

  a {
    color: ${themeColors.indigo};

    &:hover {
      color: ${themeColors.lavender};
    }
  }

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledLoginInput = styled(Input)`
  max-width: 300;
`;
