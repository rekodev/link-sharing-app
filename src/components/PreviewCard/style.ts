import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

export const StyledPreviewCard = styled.div`
  text-align: center;

  & h3 {
    font-size: 2rem;
    margin: 1.5rem 0 0 0;
  }

  & p {
    margin: 0.5rem 0 0 0;
    color: ${themeColors.darkGray};
  }
`;

export const StyledProfilePictureWrapper = styled.div`
  width: 104px;
  height: 104px;
  margin: 0 auto;
  border: ${themeColors.indigo};
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid ${themeColors.indigo};
`;
