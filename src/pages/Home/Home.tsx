import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../components/Button';
import LinkCard from '../../components/LinkCard';
import StartCard from '../../components/StartCard/StartCard';
import { LinkContext } from '../../contexts/linkContext';
import {
  StyledHome,
  StyledHomeContainer,
  StyledSaveButtonWrapper,
} from './style';

const Home = () => {
  const { links, setLinks } = useContext(LinkContext);

  const handleClick = () => {
    setLinks((prev) => [...prev, { id: uuidv4(), platform: '', link: '' }]);
  };

  return (
    <StyledHome>
      <StyledHomeContainer>
        <h2>Customize your links</h2>
        <p>
          {' '}
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <Button
          text='+ Add new link'
          variant='outlined'
          onClick={handleClick}
        />
        {links.length === 0 && <StartCard />}
        {links.map((link, index) => (
          <LinkCard
            key={link.id}
            index={index}
            link={link}
            setLinks={setLinks}
          />
        ))}
      </StyledHomeContainer>
      <StyledSaveButtonWrapper>
        <Button variant='contained' text='Save' />
      </StyledSaveButtonWrapper>
    </StyledHome>
  );
};

export default Home;
