import { Button } from '@mui/material';
import styled from 'styled-components';

import { themeColors } from '../../styles/Theme';

export const StyledLogoutButton = styled(Button)`
  && {
    background: none;
    border: none;
    border-radius: 0.5rem;
    color: ${themeColors.white};
    background-color: ${themeColors.indigo};
    min-width: initial;
    width: 48px;

    &:hover {
      background-color: ${themeColors.lavender};
      color: ${themeColors.lightLavender};
    }
  }
`;
