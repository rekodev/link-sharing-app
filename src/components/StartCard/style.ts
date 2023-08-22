import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';
import { Breakpoints } from '../../styles/breakpoints';

export const StyledCard = styled(Card)`
  && {
    border-radius: 0.75rem;
    background-color: ${themeColors.lightGray};
    box-shadow: none;
    max-width: 375px;
    margin: 1.5rem auto;

    img {
      object-fit: contain;
    }

    text-align: center;

    @media screen and (min-width: ${Breakpoints.Tablet}) {
      max-width: initial;
      margin-bottom: 0;
    }
  }
`;

export const StyledCardContent = styled(CardContent)`
  && {
    padding: 0;
  }
`;

export const StyledCardActionArea = styled(CardActionArea)`
  && {
    padding: 46px 1.25rem;

    @media screen and (min-width: ${Breakpoints.Tablet}) {
      padding: 82.5px 76.5px;
    }
  }
`;

export const StyledHeadingTypography = styled(Typography)`
  && {
    font-family: InstrumentSans;
    margin: 1.5rem 0;
    font-weight: 700;

    @media screen and (min-width: ${Breakpoints.Tablet}) {
      font-size: 32px;
    }
  }
`;

export const StyledTypography = styled(Typography)`
  &&&& {
    font-family: InstrumentSans;
    font-size: 1rem;
    color: ${themeColors.darkGray};
    line-height: 150%;

    @media screen and (min-width: ${Breakpoints.Tablet}) {
      margin-bottom: 0;
    }
  }
`;
