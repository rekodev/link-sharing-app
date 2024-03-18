import { Alert, TextField } from '@mui/material';
import styled from 'styled-components';

import { themeColors } from './Theme';

export const StyledTextField = styled(TextField)`
  && {
  }
`;

export const StyledAlert = styled(Alert)`
  && {
    border-radius: 0.75rem;
    font-family: 'InstrumentSans';
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.severity === 'info' && themeColors.white};
    background-color: ${(props) =>
      props.severity === 'info' && themeColors.nearBlack};
  }
`;
