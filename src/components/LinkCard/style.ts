import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

export const StyledLinkCard = styled.div`
  padding: 1.25rem;
  background-color: ${themeColors.lightGray};
  border-radius: 0.75rem;
  margin-top: 1.5rem;
`;

export const StyledLinkCardTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledIconAndHeading = styled.div`
  color: ${themeColors.darkGray};
`;
