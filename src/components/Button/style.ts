import { Button } from '@mui/material';
import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

interface IStyledButtonProps {
  $hideOnMobile: boolean | undefined;
}

export const StyledButton = styled(Button)<IStyledButtonProps>`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-transform: none;
    background-color: ${(props) =>
      props.variant === 'contained' ? themeColors.indigo : 'initial'};
    color: ${(props) =>
      props.variant === 'outlined'
        ? themeColors.indigo
        : props.variant === 'contained'
        ? themeColors.white
        : themeColors.darkGray};
    border-color: ${(props) =>
      props.variant === 'outlined' ? `${themeColors.indigo}` : 'initial'};
    padding: 11px 27px;
    border-radius: 0.5rem;

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

    @media screen and (max-width: 575px) {
      & .hideOnMobile {
        display: ${(props) => (props.$hideOnMobile ? 'none' : 'initial')};
      }
    }
  }
`;
