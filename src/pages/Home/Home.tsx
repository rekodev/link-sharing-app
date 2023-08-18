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
  isBeingDragged: boolean | undefined;
}

const SortableLink = ({
  link,
  index,
  setNewLinks,
  isBeingDragged,
}: ISortableLinkProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  return (
    <StyledSortableLink
      $isBeingDragged={isBeingDragged}
      ref={setNodeRef}
      style={style}
      className='link'
    >
      <LinkCard
        index={index}
        link={link}
        setNewLinks={setNewLinks}
        dragHandleProps={{ attributes, listeners }}
        isBeingDragged={isBeingDragged}
      />
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
        isBeingDragged: false,
      },
    ]);
  };

  useEffect(() => {
    console.log(newLinks);
  }, [newLinks]);

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

  const onDragStart = (event: any) => {
    const { active } = event;

    const index = newLinks.findIndex((link) => link.id === active.id);

    // setting isBeingDragged to true
    setNewLinks((prev) =>
      prev.map((link, idx) =>
        idx === index ? { ...link, isBeingDragged: true } : link
      )
    );
  };

  const onDragEnd = (event: any) => {
    // console.log('onDragEnd', event);

    const { active, over } = event;
    const oldIndex = newLinks.findIndex((link) => link.id === active.id);
    const newIndex = newLinks.findIndex((link) => link.id === over.id);

    // if no switch made
    if (active.id === over.id) {
      setNewLinks((prev) =>
        prev.map((link, idx) =>
          idx === oldIndex ? { ...link, isBeingDragged: false } : link
        )
      );

      return;
    }

    setNewLinks((prev) => arrayMove(prev, oldIndex, newIndex));

    // setting isBeingDragged to false
    setNewLinks((prev) =>
      prev.map((link, idx) =>
        idx === newIndex ? { ...link, isBeingDragged: false } : link
      )
    );
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
        {newLinks.length === 0 && <StartCard />}
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
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
                isBeingDragged={link.isBeingDragged}
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
