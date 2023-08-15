import { TextField } from '@mui/material';
import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

export const StyledTextField = styled(TextField)`
  && {
    font-family: 'InstrumentSans';
    width: 100%;
    color: ${themeColors.gray};

    & label.Mui-focused {
      color: ${themeColors.indigo};
    }

    & .MuiOutlinedInput-root {
      &.Mui-focused fieldset {
        border-color: ${themeColors.indigo};
      }
    }
  }
`;
