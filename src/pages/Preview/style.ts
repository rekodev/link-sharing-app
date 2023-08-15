import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

export const StyledPreview = styled.section`
  padding: 3.75rem;
  background-color: ${themeColors.white};
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
`;

export const StyledPreviewLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;
