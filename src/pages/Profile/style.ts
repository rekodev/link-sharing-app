import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

export const StyledProfile = styled.section`
  margin: 1rem;
  background-color: ${themeColors.white};
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 0.5rem;
  }

  > p {
    color: ${themeColors.darkGray};
  }
`;

export const StyledSaveButtonWrapper = styled.div`
  border-top: 1px solid ${themeColors.gray};
  padding: 1rem;

  button {
    width: 100%;
  }
`;

export const StyledProfileContainer = styled.div`
  padding: 1.5rem;
`;
