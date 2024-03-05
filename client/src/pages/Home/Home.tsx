import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CircularProgress, Snackbar } from '@mui/material';
import isUrl from 'is-url';
import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  StyledHome,
  StyledHomeContainer,
  StyledSaveButtonWrapper,
} from './style';
import Button from '../../components/Button';
import LinksPreview from '../../components/LinksPreview';
import SortableLink from '../../components/SortableLink';
import { StyledSortableLinkWrapper } from '../../components/SortableLink/style';
import StartCard from '../../components/StartCard/StartCard';
import { LinkContext } from '../../contexts/linkContext';
import useDragHandlers from '../../hooks/useDragHandlers';
import useUser from '../../hooks/useUser';
import { StyledAlert } from '../../styles/UtilityStyles';
import { SnackbarType } from '../../types/profileDetails';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import { platforms } from '../../utils/platformList';

const Home = () => {
  const { links, setLinks } = useContext(LinkContext);
  const [newLinks, setNewLinks] = useState<IShareableLinkValues[]>(links);
  const [open, setOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState<SnackbarType>('success');
  const [uniqueLinks, setUniqueLinks] = useState(true);
  const { user, isUserLoading } = useUser();

  const { onDragStart, onDragEnd } = useDragHandlers({ newLinks, setNewLinks });

  const handleAddNewLink = () => {
    setNewLinks((prev) => [
      ...prev,
      {
        id: uuidv4(),
        platform: platforms[0].name,
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

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const renderLinks = () => (
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
  );

  const renderSnackbar = () => (
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
  );

  if (isUserLoading || !user)
    return <CircularProgress color='primary' sx={{ margin: 'auto' }} />;

  return (
    <>
      <LinksPreview user={user} />
      <StyledHome>
        <StyledHomeContainer>
          <h2>Customize your links</h2>
          <p>
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <Button
            text='+ Add new link'
            variant='outlined'
            onClick={handleAddNewLink}
          />
          {newLinks.length === 0 ? <StartCard /> : renderLinks()}
        </StyledHomeContainer>
        <StyledSaveButtonWrapper>
          <Button variant='contained' text='Save' onClick={handleSave} />
        </StyledSaveButtonWrapper>

        {renderSnackbar()}
      </StyledHome>
    </>
  );
};

export default Home;
