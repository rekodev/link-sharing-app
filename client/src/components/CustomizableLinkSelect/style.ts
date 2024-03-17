import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import styled from 'styled-components';

import { themeColors } from '../../styles/Theme';

type Props = {
  $hasInput: boolean;
};

export const StyledFormControl = styled(FormControl)<{ $hasError: boolean }>`
  && {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    & .MuiFormLabel-root.Mui-focused {
      color: ${themeColors.indigo};
    }

    &&&& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 1px solid
        ${(props) => (props.$hasError ? themeColors.red : themeColors.indigo)};
      box-shadow: 0 0 2rem
        ${(props) => (props.$hasError ? themeColors.red : themeColors.lavender)};
    }
  }
`;

export const StyledInputLabel = styled(InputLabel)`
  && {
    top: -0.25rem;
    left: 0;
    color: #333 !important;
    font-family: 'InstrumentSans';
    transform: initial;
    font-size: 12px;
  }
`;

export const StyledSelect = styled(Select)<Props>`
  && {
    font-family: 'InstrumentSans';
    font-size: 1rem;
    height: 48px;
    background-color: ${(props) =>
      props.$hasInput ? themeColors.white : 'transparent'};
    border-radius: 0.75rem;

    > div {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    &&&& div.MuiSelect-select {
      font-size: 1rem;
    }

    & img {
      width: 1rem;
    }

    & label.Mui-focused {
      color: ${themeColors.indigo};
    }

    & .MuiOutlinedInput-root {
      overflow: hidden;

      &.Mui-focused fieldset {
        border-color: ${themeColors.indigo};
      }
    }

    & fieldset {
      border-radius: 0.75rem;
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

export const StyledFormHelperText = styled(FormHelperText)`
  && {
    color: ${themeColors.red};
    position: absolute;
    right: 0;
    top: -4px;
  }
`;
