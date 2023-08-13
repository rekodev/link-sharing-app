import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

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
  }

  text-align: center;
`;

export const StyledCardContent = styled(CardContent)`
  && {
    padding: 0;
  }
`;

export const StyledCardActionArea = styled(CardActionArea)`
  && {
    padding: 46px 1.25rem;
  }
`;

export const StyledHeadingTypography = styled(Typography)`
  && {
    font-family: InstrumentSans;
    margin: 1.5rem 0;
  }
`;

export const StyledTypography = styled(Typography)`
  && {
    font-family: InstrumentSans;
    font-size: 1rem;
    color: ${themeColors.darkGray};
    line-height: 150%;
  }
`;
