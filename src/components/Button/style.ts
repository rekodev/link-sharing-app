import { Button } from '@mui/material';
import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

interface IStyledButtonProps {
  $hideOnMobile: boolean | undefined;
  $active?: boolean;
}

export const StyledButton = styled(Button)<IStyledButtonProps>`
  && {
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-transform: none;
    background-color: ${(props) =>
      props.variant === 'contained'
        ? themeColors.indigo
        : props.$active
        ? themeColors.lightLavender
        : 'initial'};
    color: ${(props) =>
      props.variant === 'outlined'
        ? themeColors.indigo
        : props.variant === 'contained'
        ? themeColors.white
        : props.$active
        ? themeColors.indigo
        : themeColors.darkGray};
    border-color: ${(props) =>
      props.variant === 'outlined' ? `${themeColors.indigo}` : 'initial'};
    padding: ${(props) =>
      props.variant === 'text' ? '4px 12px' : '11px 27px'};
    border-radius: 0.5rem;
    font-weight: ${(props) => (props.variant === 'text' ? '400' : '600')};
    font-family: InstrumentSans;
    line-height: 150%;

    svg path {
      fill: ${(props) => props.$active && themeColors.indigo};
    }

    :hover {
      background: ${(props) =>
        props.variant === 'contained'
          ? themeColors.lavender
          : themeColors.lightLavender};
      border-color: ${(props) =>
        props.variant === 'outlined' ? `${themeColors.indigo}` : 'initial'};

      svg path {
        fill: ${themeColors.indigo};
      }

      color: ${(props) =>
        props.variant === 'contained' ? themeColors.white : themeColors.indigo};
    }

    & div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    & img {
      width: 1.25rem;
    }

    @media screen and (max-width: 767px) {
      & .hideOnMobile {
        display: ${(props) => (props.$hideOnMobile ? 'none' : 'initial')};
      }
    }
  }
`;
