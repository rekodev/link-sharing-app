import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

export const StyledProfileForm = styled.form`
  padding: 1.25rem;
  background-color: ${themeColors.lightGray};
  border-radius: 1.25rem;
  margin-top: 1rem;
  padding-bottom: 0.25rem;
`;

export const StyledSaveButtonWrapper = styled.div`
  border-top: 1px solid ${themeColors.gray};
  /* padding: 1rem; */

  button {
    width: 100%;
  }
`;
