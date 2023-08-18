import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

interface ISortableLinkProps {
  $isBeingDragged: boolean | undefined;
}

export const StyledHome = styled.section`
  background-color: ${themeColors.white};
  border-radius: 0.75rem;
  margin: 1rem;
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
`;

export const StyledSaveButtonWrapper = styled.div`
  border-top: 1px solid ${themeColors.gray};
  padding: 1rem;

  button {
    width: 100%;
  }
`;

export const StyledSortableLink = styled.div<ISortableLinkProps>`
  /* z-index: 9999; */
  z-index: ${(props) => (props.$isBeingDragged ? '1' : 'initial')};
`;
