import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';
import { Breakpoints } from '../../styles/Breakpoints';

export const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${themeColors.lightGray};
  }

  @media screen and (min-width: ${Breakpoints.TV}) {
    main {
      flex-direction: row;
    }
  }
`;
