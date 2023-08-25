import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';
import { Breakpoints } from '../../styles/Breakpoints';

interface IStyledInputProps {
  $hasValue: boolean;
  $hasError: boolean;
  $hasImage: boolean;
}

interface IStyledInputWrapperProps {
  $initialStyle: boolean;
  $hasValue?: boolean;
}

export const StyledInput = styled.input<IStyledInputProps>`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
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
    padding-right: ${(props) => props.$hasError && '40%'};
  }
`;

export const StyledLabel = styled.label<IStyledInputWrapperProps>`
  font-size: 0.75rem;
  color: ${themeColors.nearBlack};
  margin: 0;

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    font-size: ${(props) => !props.$initialStyle && '1rem'};
  }
`;

export const StyledInputWrapper = styled.div<IStyledInputWrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    flex-direction: ${(props) => !props.$initialStyle && 'row'};
    align-items: ${(props) => !props.$initialStyle && 'center'};
    justify-content: space-between;
  }
`;

export const StyledImage = styled.img`
  position: absolute;
  width: 16px;
  bottom: 1rem;
  left: 1rem;
  z-index: 6;
`;

export const StyledErrorText = styled.p<IStyledInputWrapperProps>`
  position: absolute;
  right: 0.75rem;
  font-size: 0.75rem;

  && {
    color: ${themeColors.red};
  }

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    display: flex;
    align-items: center;
    padding-left: 1rem;
    pointer-events: none;
  }
`;

export const StyledInputFieldWrapper = styled.div<IStyledInputWrapperProps>`
  position: relative;
  width: 100%;
  height: 48px;

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    max-width: ${(props) => !props.$initialStyle && '360px'};
    min-width: ${(props) => !props.$initialStyle && '360px'};
  }
`;
