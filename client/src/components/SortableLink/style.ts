import styled from 'styled-components';

import { Breakpoints } from '../../styles/Breakpoints';
import { themeColors } from '../../styles/Theme';

type IsBeingDragged = {
  $isBeingDragged: boolean | undefined;
};

export const StyledSortableLink = styled.div<IsBeingDragged>`
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

export const StyledLinkCard = styled.div<IsBeingDragged>`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background-color: ${themeColors.lightGray};
  border-radius: 0.75rem;
  gap: 1.25rem;
  box-shadow: ${(props) =>
    props.$isBeingDragged ? `-8px 8px 16px ${themeColors.gray}` : 'none'};
  position: relative;
`;

export const StyledLinkCardTextWrapper = styled.div<IsBeingDragged>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  & h4 {
    margin: 0;
  }

  .drag-handle {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: ${(props) => (props.$isBeingDragged ? 'grabbing' : 'grab')};
  }
`;

export const StyledIconAndHeading = styled.div`
  color: ${themeColors.darkGray};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 0.75rem;
  }
`;
