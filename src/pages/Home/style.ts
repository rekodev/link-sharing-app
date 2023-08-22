import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';
import { Breakpoints } from '../../styles/breakpoints';

interface ISortableLinkProps {
  $isBeingDragged: boolean | undefined;
}

export const StyledHome = styled.section`
  background-color: ${themeColors.white};
  border-radius: 0.75rem;
  margin: 1rem;

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    margin: 0 1.5rem 1.5rem 1.5rem;
  }
`;

export const StyledHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;

  h2 {
    margin: 0;
  }

  p:nth-child(2) {
    color: ${themeColors.darkGray};
    margin: 8px 0 40px 0;
  }

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    padding: 2.5rem;

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

    button {
      width: initial;
      align-self: flex-end;
    }
  }
`;

export const StyledSortableLink = styled.div<ISortableLinkProps>`
  z-index: ${(props) => (props.$isBeingDragged ? '1' : 'initial')};
`;
