import styled from 'styled-components';

import { Breakpoints } from '../../styles/Breakpoints';
import { themeColors } from '../../styles/Theme';

export const StyledProfilePictureCard = styled.div`
  background-color: ${themeColors.lightGray};
  padding: 1.25rem;
  border-radius: 0.75rem;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const StyledCardHeading = styled.h4`
  font-weight: 400;
  font-size: 16px;
  color: ${themeColors.darkGray};
  margin: 0;
  margin-bottom: 0.5rem;
`;

export const UploadedImageWrapper = styled.div`
  > p {
    color: ${themeColors.darkGray};
    margin: 0;
    line-height: 150%;
    font-size: 12px;
  }

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    max-width: 360px;
  }
`;
