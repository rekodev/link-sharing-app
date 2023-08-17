import isUrl from 'is-url';
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
  StyledSortableLink,
} from './style';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import { CSS } from '@dnd-kit/utilities';

interface ISortableLinkProps {
  link: IShareableLinkValues;
  index: number;
  setNewLinks: React.Dispatch<React.SetStateAction<IShareableLinkValues[]>>;
}

const SortableLink = ({ link, index, setNewLinks }: ISortableLinkProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  return (
    <StyledSortableLink
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <LinkCard index={index} link={link} setNewLinks={setNewLinks} />
    </StyledSortableLink>
  );
};

const Home = () => {
  const { links, setLinks } = useContext(LinkContext);
  const [newLinks, setNewLinks] = useState(links);

  const handleClick = () => {
    setNewLinks((prev) => [
      ...prev,
      {
        id: uuidv4(),
        platform: 'GitHub',
        link: '',
        attemptedSave: false,
        errors: { platform: false, link: false },
      },
    ]);
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
        attemptedSave: true,
        errors: { platform: !isPlatformValid, link: !isLinkValid },
      };
    });

    if (allValid) {
      setLinks(updatedLinks);
    } else {
      setNewLinks(updatedLinks);
    }
  };

  const onDragEnd = (event: any) => {
    console.log('onDragEnd', event);
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }

    setNewLinks((prev) => {
      const oldIndex = links.findIndex((link) => link.id === active.id);
      const newIndex = links.findIndex((link) => link.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
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
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext
            items={newLinks}
            strategy={verticalListSortingStrategy}
          >
            {newLinks.map((link, index) => (
              <SortableLink
                key={link.id}
                link={link}
                index={index}
                setNewLinks={setNewLinks}
              />
            ))}
          </SortableContext>
        </DndContext>
      </StyledHomeContainer>
      <StyledSaveButtonWrapper>
        <Button variant='contained' text='Save' onClick={handleSave} />
      </StyledSaveButtonWrapper>
    </StyledHome>
  );
};

export default Home;
