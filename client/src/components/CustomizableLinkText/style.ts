import { TextField } from '@mui/material';
import styled from 'styled-components';

import { themeColors } from '../../styles/Theme';

export const StyledTextField = styled(TextField)`
  && {
    font-family: 'InstrumentSans';
    width: 100%;
    color: ${themeColors.gray};
    /* border-radius: 0.75rem; */

    & label.Mui-focused {
      color: ${themeColors.indigo};
    }

    & .MuiOutlinedInput-root {
      &.Mui-focused fieldset {
        border-color: ${themeColors.indigo};
      }
    }
  }

  && {
    font-family: 'InstrumentSans';
    font-size: 1rem;
    height: 48px;

    > div {
      display: flex;
      align-items: center;
      gap: 0.375rem;
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
        box-shadow: 0 0 32px ${themeColors.lavender};
      }
    }

    & fieldset {
      /* border-radius: 0.75rem; */
      /* background-color: ${themeColors.white}; */
    }

    & label {
      position: absolute;
    }

    .MuiInputLabel-outlined {
      position: absolute;
      top: -2.5rem;
      left: -0.75rem;
      font-size: 12px;
      color: #333;
      font-family: 'InstrumentSans';
    }

    .MuiInputLabel-outlined.Mui-focused {
      transform: translate(14px, 16px) scale(1);
    }

    .MuiInputLabel-outlined.MuiInputLabel-shrink {
      transform: translate(14px, 16px) scale(1);
    }

    /* Style the input field */
    .MuiOutlinedInput-root fieldset {
      border: 1px solid rgba(0, 0, 0, 0.23);
      /* background-color: #fff; */
    }

    .MuiOutlinedInput-notchedOutline legend {
      width: 0 !important; // Removes the notch space
      padding: 0 !important; // Removes the default padding
    }
  }
`;

export const StyledTextFieldWrapper = styled.div`
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;

  .MuiInputBase-root {
    min-height: 48px;
    border-radius: 0.75rem;
  }

  .MuiFormHelperText-root {
    position: absolute;
    right: 0;
    top: -1.5rem;
  }

  &&&& .MuiInputBase-input {
    height: 13px;
    background: transparent;
  }
`;
