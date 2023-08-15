import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

export const StyledLinkCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background-color: ${themeColors.lightGray};
  border-radius: 0.75rem;
  margin-top: 1.5rem;
  gap: 0.75rem;
`;

export const StyledLinkCardTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & h4 {
    margin: 0;
  }
`;

export const StyledIconAndHeading = styled.div`
  color: ${themeColors.darkGray};
`;
