import styled from 'styled-components';

import { Breakpoints } from '../../styles/Breakpoints';
import { themeColors } from '../../styles/Theme';

export const StyledHeader = styled.header`
  background-color: ${themeColors.lightGray};

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    padding: 1.5rem;
  }
`;

export const StyledHeaderContainer = styled.div`
  position: relative;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 46px;
  background-color: ${themeColors.white};

  .small-logo {
    width: 32px;
  }

  .large-logo {
    display: none;
    height: 32px;
    width: auto;
  }

  @media screen and (min-width: 768px) {
    border-radius: 0.75rem;

    .small-logo {
      display: none;
    }
    .large-logo {
      display: initial;
    }
  }
`;

export const StyledLinks = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 767px) {
    && .MuiButton-root {
      width: 48px;
      min-width: 48px;
      padding-left: 0;
      padding-right: 0;
    }
  }
`;

export const StyledPreviewAndLogout = styled.div`
  display: flex;
  gap: 4px;

  @media screen and (max-width: 767px) {
    a > .MuiButton-root {
      width: 48px;
      min-width: 48px;
      padding-left: 0;
      padding-right: 0;
    }
  }
`;

export const StyledPurpleRectangle = styled.div`
  display: none;
  width: 100%;
  background-color: ${themeColors.indigo};
  height: 360px;
  position: absolute;
  z-index: 0;
  border-radius: 0 0 2rem 2rem;

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    display: initial;
  }
`;
