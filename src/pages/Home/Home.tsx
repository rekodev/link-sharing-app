import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Snackbar } from '@mui/material';
import isUrl from 'is-url';
import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../components/Button';
import LinkCard from '../../components/LinkCard';
import StartCard from '../../components/StartCard/StartCard';
import { LinkContext } from '../../contexts/linkContext';
import { StyledAlert } from '../../styles/UtilityStyles';
import { SnackbarType } from '../../types/profileDetails';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import {
  StyledHome,
  StyledHomeContainer,
  StyledSaveButtonWrapper,
  StyledSortableLink,
  StyledSortableLinkWrapper,
} from './style';
import LinksPreview from '../../components/LinksPreview';
import { ProfileDetailsContext } from '../../contexts/profileDetailsContext';

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
  const {profileDetails} = useContext(ProfileDetailsContext);
  const [newLinks, setNewLinks] = useState<IShareableLinkValues[]>(links);
  const [open, setOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState<SnackbarType>('success');
  const [uniqueLinks, setUniqueLinks] = useState(true);

  const handleClick = () => {
    setNewLinks((prev) => [
      ...prev,
      {
        id: uuidv4(),
        platform: 'GitHub',
        link: '',
        attemptedSave: false,
        errors: { platform: false, link: false, unique: false },
        isBeingDragged: false,
      },
    ]);
  };

  const handleSave = () => {
    let allValid = true;
    // localStorage.setItem('links', JSON.stringify(links));
    // Check if platforms are unique
    const uniquePlatforms =
      new Set(newLinks.map((link) => link.platform)).size === newLinks.length;

    const updatedLinks = newLinks.map((link) => {
      const isLinkValid = isUrl(link.link);
      const isPlatformValid = Boolean(link.platform);

      if (!isLinkValid || !isPlatformValid || !uniquePlatforms) {
        allValid = false;

        return {
          ...link,
          attemptedSave: true,
          errors: {
            platform: !isPlatformValid,
            link: !isLinkValid,
          },
        };
      }

      return {
        ...link,
        attemptedSave: false,
        errors: { platform: false, link: false },
      };
    });

    if (allValid) {
      setLinks(updatedLinks);
      setSnackbarType('success');
      setOpen(true);
      setUniqueLinks(true);
    } else {
      setNewLinks(updatedLinks);
      setSnackbarType('error');
      setOpen(true);
      if (!uniquePlatforms) {
        setUniqueLinks(false);
      }
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

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <LinksPreview links={newLinks} profileDetails={profileDetails} />
      <StyledHome>
        <StyledHomeContainer>
          <h2>Customize your links</h2>
          <p>
            {' '}
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <Button
            text='+ Add new link'
            variant='outlined'
            onClick={handleClick}
          />
          {newLinks.length === 0 && <StartCard />}
          <StyledSortableLinkWrapper>
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
          </StyledSortableLinkWrapper>
        </StyledHomeContainer>
        <StyledSaveButtonWrapper>
          <Button variant='contained' text='Save' onClick={handleSave} />
        </StyledSaveButtonWrapper>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <StyledAlert
            onClose={handleClose}
            severity={snackbarType}
            sx={{ width: '100%' }}
          >
            {snackbarType === 'success'
              ? 'Saved successfully'
              : uniqueLinks
              ? 'Oops! Some fields need attention'
              : 'Platforms must be unique'}
          </StyledAlert>
        </Snackbar>
      </StyledHome>
    </>
  );
};

export default Home;
