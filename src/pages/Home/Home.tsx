import { useContext, useState } from 'react';
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
import { ILinkCardError } from '../../types/errors';

const Home = () => {
  const { links, setLinks } = useContext(LinkContext);
  const [newLinks, setNewLinks] = useState(links);
  const [isError, setIsError] = useState<ILinkCardError>({
    select: true,
    text: true,
    attemptedSave: false,
  });

  const handleClick = () => {
    setNewLinks((prev) => [...prev, { id: uuidv4(), platform: '', link: '' }]);
    console.log(links);
  };

  const handleSave = () => {
    // localStorage.setItem('links', JSON.stringify(links));
    if (isError.select === false && isError.text == false) {
      setLinks(newLinks);
      setIsError((prev) => ({ ...prev, attemptedSave: false }));
    } else {
      setIsError((prev) => ({ ...prev, attemptedSave: true }));
    }
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
        {(newLinks.length === 0 || newLinks.length === 0) && <StartCard />}
        {newLinks.map((link, index) => (
          <LinkCard
            key={link.id}
            index={index}
            link={link}
            setNewLinks={setNewLinks}
            isError={isError}
            setIsError={setIsError}
          />
        ))}
      </StyledHomeContainer>
      <StyledSaveButtonWrapper>
        <Button variant='contained' text='Save' onClick={handleSave} />
      </StyledSaveButtonWrapper>
    </StyledHome>
  );
};

export default Home;
