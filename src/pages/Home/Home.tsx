import isUrl from 'is-url';
import { useContext, useEffect, useState } from 'react';
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
  const [newLinks, setNewLinks] = useState(links);
  const [_attemptedSave, setAttemptedSave] = useState(false);

  const handleClick = () => {
    setNewLinks((prev) => [
      ...prev,
      {
        id: uuidv4(),
        platform: '',
        link: '',
        errors: { platform: false, link: false },
      },
    ]);
    setAttemptedSave(false);
  };

  const handleSave = () => {
    let allValid = true;
    // localStorage.setItem('links', JSON.stringify(links));
    const updatedLinks = newLinks.map((link) => {
      const isLinkValid = isUrl(link.link);
      const isPlatformValid = Boolean(link.platform);

      if (!isLinkValid || !isPlatformValid) {
        allValid = false;
      }

      return {
        ...link,
        errors: { platform: !isPlatformValid, link: !isLinkValid },
      };
    });

    if (allValid) {
      setLinks(updatedLinks);
    } else {
      setNewLinks(updatedLinks);
      setAttemptedSave(true);
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
