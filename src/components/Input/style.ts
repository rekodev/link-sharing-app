import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';
import { Breakpoints } from '../../styles/breakpoints';

interface IStyledInputProps {
  $hasValue: boolean;
  $hasError: boolean;
  $hasImage: boolean;
}

export const StyledInput = styled.input<IStyledInputProps>`
  height: 22px;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  padding-left: ${(props) => (props.$hasImage ? '2.5rem' : '0.75rem')};
  border: ${(props) =>
    props.$hasError
      ? `1px solid ${themeColors.red}`
      : `1px solid ${themeColors.gray}`};
  margin-top: 0;
  font-family: 'InstrumentSans';
  font-size: 1rem;
  background-color: ${(props) =>
    props.$hasValue ? themeColors.white : 'transparent'};

  :focus {
    border: ${(props) =>
      props.$hasError
        ? `1px solid ${themeColors.red}`
        : `1px solid ${themeColors.indigo}`};
    outline: none;
    box-shadow: ${(props) =>
      props.$hasError
        ? `0 0 2rem ${themeColors.red}`
        : `0 0 2rem ${themeColors.lavender}`};
  }

  :hover {
    border-color: ${(props) => (props.$hasError ? themeColors.red : 'black')};

    :focus {
      border: ${(props) =>
        props.$hasError
          ? `1px solid ${themeColors.red}`
          : `1px solid ${themeColors.indigo}`};
    }
  }

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    max-width: 330px;
    min-width: 330px;
  }
`;

export const StyledLabel = styled.label`
  font-size: 0.75rem;
  color: ${themeColors.darkGray};
  margin: 0;

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    font-size: 1rem;
  }
`;

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
`;

export const StyledImage = styled.img`
  position: absolute;
  width: 16px;
  bottom: 1rem;
  left: 1rem;
`;

export const StyledErrorText = styled.p`
  position: absolute;
  right: 0.75rem;
  font-size: 0.75rem;
  color: ${themeColors.red};
`;
