import { Box } from '@mui/material';
import styled from 'styled-components';

import { themeColors } from '../../styles/Theme';

export const StyledProfileDetailsFieldsContainer = styled.div`
  padding: 1.25rem;
  background-color: ${themeColors.lightGray};
  border-radius: 1.25rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const StyledSaveButtonWrapper = styled.div`
  border-top: 1px solid ${themeColors.gray};
  /* padding: 1rem; */

  button {
    width: 100%;
  }
`;

export const StyledInputBox = styled(Box)`
  && {
    fieldset {
      border-radius: 0.75rem;
      /* background-color: ${themeColors.white}; */
    }

    & label {
      position: absolute;
    }

    input {
      background-color: #fff;
      border-radius: 0.75rem;
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
