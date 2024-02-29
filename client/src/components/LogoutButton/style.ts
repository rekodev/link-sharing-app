import { Button } from '@mui/material';
import styled from 'styled-components';

import { themeColors } from '../../styles/Theme';

export const StyledLogoutButton = styled(Button)`
  && {
    background: none;
    border: none;
    border-radius: 0.5rem;
    color: ${themeColors.indigo};
    background-color: ${themeColors.lightLavender};
    min-width: initial;
    width: 48px;

    &:hover {
      background-color: ${themeColors.indigo};
      color: ${themeColors.white};
    }
  }
`;
