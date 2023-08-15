import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

export const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex: 1;
    background-color: ${themeColors.lightGray};
  }
`;
