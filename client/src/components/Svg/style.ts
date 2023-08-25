import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

interface IStyledSvgProps {
  $noHeight?: boolean;
}

export const StyledSvgWrapper = styled.div<IStyledSvgProps>`
  height: ${(props) => props.$noHeight && '0'};
`;

export const StyledSvg = styled.svg`
  :hover {
    fill: ${themeColors.indigo};
  }
`;
