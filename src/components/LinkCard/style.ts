import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

interface IStyledLinkCardProps {
  $isBeingDragged: boolean | undefined;
}

export const StyledLinkCard = styled.div<IStyledLinkCardProps>`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background-color: ${themeColors.lightGray};
  border-radius: 0.75rem;
  /* margin-top: 1.5rem; */
  gap: 1.25rem;
  box-shadow: ${(props) =>
    props.$isBeingDragged ? `-8px 8px 16px ${themeColors.gray}` : 'none'};
  position: relative;
`;

export const StyledLinkCardTextWrapper = styled.div<IStyledLinkCardProps>`
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
