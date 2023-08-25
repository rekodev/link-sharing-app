import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';
import { Breakpoints } from '../../styles/Breakpoints';

export const StyledProfile = styled.section`
  margin: 1rem;
  background-color: ${themeColors.white};
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  flex: 1;

  h2 {
    margin-bottom: 0.5rem;
  }

  p {
    color: ${themeColors.nearBlack};
  }

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    margin: 1.5rem;
    margin-top: 0;
    position: relative;

    h2 {
      font-size: 2rem;
    }
  }
`;

export const StyledSaveButtonWrapper = styled.div`
  border-top: 1px solid ${themeColors.gray};
  padding: 1rem;

  button {
    width: 100%;
  }

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    display: flex;
    justify-content: flex-end;
    padding: 1.5rem 2.5rem;
    position: absolute;
    bottom: 0;
    width: 100%;

    button {
      width: initial;
    }
  }

  /* @media screen and (min-width: ${Breakpoints.Tablet}) {
    padding: 24px 40px;
    width: 100%;

    background-color: #fff;
    border-radius: 0 0 12px 12px;

    button {
      width: initial;
      align-self: flex-end;
    }
  } */
`;

export const StyledProfileContainer = styled.div`
  padding: 1.5rem;

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    padding: 2.5rem;
  }
`;
