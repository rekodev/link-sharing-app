import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

export const StyledInput = styled.input`
  height: 22px;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid ${themeColors.gray};
  margin-top: 0;
  font-family: 'InstrumentSans';
`;

export const StyledLabel = styled.label`
  font-size: 0.75rem;
  color: #333;
  margin: 0;
`;

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
