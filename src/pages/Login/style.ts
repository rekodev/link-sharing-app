import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

export const StyledLogin = styled.section`
  padding: 2rem;
`;

export const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;

  > p {
    margin-top: 0.5rem;
    color: ${themeColors.darkGray};
  }
`;

export const StyledLogoWrapper = styled.div`
  height: 2.5rem;
  margin-bottom: 4rem;
  width: 180px;

  img {
    height: 100%;
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
`;
