import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';
import { Breakpoints } from '../../styles/Breakpoints';

interface ISortableLinkProps {
  $isBeingDragged: boolean | undefined;
}

export const StyledHome = styled.section`
  background-color: ${themeColors.white};
  border-radius: 0.75rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    margin: 0 1.5rem 1.5rem 1.5rem;
    position: relative;
  }
`;

export const StyledHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.5rem;
  padding-bottom: 0;
  overflow: hidden;

  h2 {
    margin: 0;
  }

  p:nth-child(2) {
    color: ${themeColors.darkGray};
    margin: 8px 0 40px 0;
  }

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    padding: 2.5rem;
    padding-bottom: 0;

    h2 {
      font-size: 2rem;
    }
  }
`;

export const StyledSaveButtonWrapper = styled.div`
  border-top: 1px solid ${themeColors.gray};
  padding: 1rem;
  display: flex;
  flex-direction: column;

  button {
    width: 100%;
  }

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    padding: 24px 40px;
    position: absolute;
    width: 100%;
    bottom: 0;
    background-color: #fff;
    border-radius: 0 0 12px 12px;
    z-index: 10;

    button {
      width: initial;
      align-self: flex-end;
    }
  }

  @media screen and (min-width: ${Breakpoints.TV}) {
  }
`;

export const StyledSortableLink = styled.div<ISortableLinkProps>`
  z-index: ${(props) => (props.$isBeingDragged ? '1' : 'initial')};
`;

export const StyledSortableLinkWrapper = styled.div`
  margin-top: 1.5rem;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
  padding-bottom: 1.5rem;
  overflow-y: auto;

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    max-height: 485px;
  }
`;
