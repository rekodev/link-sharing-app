import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';
import { Breakpoints } from '../../styles/Breakpoints';

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
  align-items: center;
  justify-content: center;
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
