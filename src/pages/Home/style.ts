import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

export const StyledHome = styled.div`
  background-color: ${themeColors.white};
  border-radius: 0.75rem;
`;

export const StyledHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;

  h2 {
    margin: 0;
  }

  p:nth-child(2) {
    color: ${themeColors.darkGray};
    margin: 8px 0 40px 0;
  }
`;

export const StyledSaveButtonWrapper = styled.div`
  border-top: 1px solid ${themeColors.gray};
  padding: 1rem;

  button {
    width: 100%;
  }
`;
