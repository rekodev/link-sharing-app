import { CardMedia } from '@mui/material';
import illustrationEmpty from '../../assets/images/illustration-empty.svg';
import {
  StyledCard,
  StyledCardActionArea,
  StyledCardContent,
  StyledHeadingTypography,
  StyledTypography,
} from './style';

const StartCard = () => {
  return (
    <StyledCard>
      <StyledCardActionArea>
        <CardMedia
          component='img'
          height='140'
          image={illustrationEmpty}
          alt='Illustration Empty'
        />
        <StyledCardContent>
          <StyledHeadingTypography gutterBottom variant='h5'>
            Let's get you started
          </StyledHeadingTypography>
          <StyledTypography>
            Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We're here to help you
            share your profiles with everyone!
          </StyledTypography>
        </StyledCardContent>
      </StyledCardActionArea>
    </StyledCard>
  );
};

export default StartCard;
