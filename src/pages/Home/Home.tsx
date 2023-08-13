import Button from '../../components/Button';
import StartCard from '../../components/StartCard/StartCard';
import {
  StyledHome,
  StyledHomeContainer,
  StyledSaveButtonWrapper,
} from './style';

const Home = () => {
  return (
    <StyledHome>
      <StyledHomeContainer>
        <h2>Customize your links</h2>
        <p>
          {' '}
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <Button text='+ Add new link' variant='outlined' />
        <StartCard />
      </StyledHomeContainer>
      <StyledSaveButtonWrapper>
        <Button variant='contained' text='Save' />
      </StyledSaveButtonWrapper>
    </StyledHome>
  );
};

export default Home;
