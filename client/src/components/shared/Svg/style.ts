import styled from 'styled-components';

import { themeColors } from '../../../styles/Theme';

type Props = {
  $noHeight?: boolean;
};

export const StyledSvgWrapper = styled.div<Props>`
  height: ${(props) => props.$noHeight && '0'};
`;

export const StyledSvg = styled.svg`
  :hover {
    fill: ${themeColors.indigo};
  }
`;
