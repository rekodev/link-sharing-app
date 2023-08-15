import { useState } from 'react';
import Button from '../../components/Button';
import StartCard from '../../components/StartCard/StartCard';
import {
  StyledHome,
  StyledHomeContainer,
  StyledSaveButtonWrapper,
} from './style';
import LinkCard from '../../components/LinkCard';

const Home = () => {
  const [links, setLinks] = useState<[] | String[]>([]);

  const handleClick = () => {
    const newLinkIndex = links.length;

    setLinks((prev) => [...prev, `link${newLinkIndex}`]);

    console.log(links);
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
        {links.map((_link, index) => (
          <LinkCard key={index} index={index} setLinks={setLinks} />
        ))}
      </StyledHomeContainer>
      <StyledSaveButtonWrapper>
        <Button variant='contained' text='Save' />
      </StyledSaveButtonWrapper>
    </StyledHome>
  );
};

export default Home;
