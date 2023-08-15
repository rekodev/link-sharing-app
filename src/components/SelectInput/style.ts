import { FormControl, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

export const StyledFormControl = styled(FormControl)`
  && {
    & .MuiFormLabel-root.Mui-focused {
      color: ${themeColors.indigo};
    }

    & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${themeColors.indigo};
    }
  }
`;

export const StyledSelect = styled(Select)`
  && {
    font-family: 'InstrumentSans';

    > div {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    & img {
      width: 1rem;
    }

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

export const StyledMenuItem = styled(MenuItem)`
  && {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    & img {
      width: 1rem;
    }
  }
`;
