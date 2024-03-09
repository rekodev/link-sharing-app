import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CircularProgress, Snackbar } from '@mui/material';
import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  StyledHome,
  StyledHomeContainer,
  StyledSaveButtonWrapper,
} from './style';
import { updateLinks } from '../../api';
import Button from '../../components/Button';
import CustomizableLink from '../../components/CustomizableLink';
import { StyledCustomizableLinkWrapper } from '../../components/CustomizableLink/style';
import LinksPreview from '../../components/LinksPreview';
import StartCard from '../../components/StartCard/StartCard';
import useDragHandlers from '../../hooks/useDragHandlers';
import useUser from '../../hooks/useUser';
import useUserLinks from '../../hooks/useUserLinks';
import { StyledAlert } from '../../styles/UtilityStyles';
import {
  CustomizableLink as CustomizableLinkType,
  UserLink,
} from '../../types/link';
import { SnackbarType } from '../../types/profileDetails';
import { platforms } from '../../utils/platformList';

const Home = () => {
  const { links: userLinks, isLinksLoading: userLinksLoading } = useUserLinks();
  const [customizableLinks, setCustomizableLinks] = useState<
    Array<CustomizableLinkType>
  >([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState<SnackbarType>('success');
  // const [uniqueLinks, setUniqueLinks] = useState(true);
  const { user, isUserLoading } = useUser();

  const { onDragStart, onDragEnd } = useDragHandlers({
    customizableLinks,
    setCustomizableLinks,
  });

  const handleAddNewLink = () => {
    setCustomizableLinks((prev) => [
      ...prev,
      {
        id: uuidv4(),
        platform: platforms[0].name,
        linkUrl: '',
        attemptedSave: false,
        errors: { platform: false, linkUrl: false, unique: false },
        isBeingDragged: false,
        index: 0,
      },
    ]);
  };

  useEffect(() => {
    if (!userLinks) return;

    const latestLinks: Array<CustomizableLinkType> = userLinks.map((link) => ({
      id: uuidv4(),
      platform: link.platform,
      linkUrl: link.linkUrl,
      attemptedSave: false,
      errors: { platform: false, linkUrl: false, unique: false },
      isBeingDragged: false,
      index: link.index,
    }));

    setCustomizableLinks(latestLinks);
  }, [userLinks]);

  const handleSubmit = async () => {
    if (!user?.id) return;

    const linksToBeSubmitted: Array<UserLink> = customizableLinks.map(
      (link) => ({
        platform: link.platform,
        linkUrl: link.linkUrl,
        index: link.index,
      })
    );

    console.log(linksToBeSubmitted);

    const result = await updateLinks(user.id, linksToBeSubmitted);
    setSnackbarOpen(true);

    if (result.status !== HttpStatusCode.Ok) {
      setSnackbarType('error');
    }

    setSnackbarType('success');
  };

  // const handleSave = () => {
  //   let allValid = true;
  //   // localStorage.setItem('links', JSON.stringify(links));
  //   // Check if platforms are unique
  //   const uniquePlatforms =
  //     new Set(customizableLinks.map((link) => link.platform)).size ===
  //     customizableLinks.length;

  //   const updatedLinks = customizableLinks.map((link) => {
  //     const isLinkValid = isUrl(link.linkUrl);
  //     const isPlatformValid = Boolean(link.platform);

  //     if (!isLinkValid || !isPlatformValid || !uniquePlatforms) {
  //       allValid = false;

  //       return {
  //         ...link,
  //         attemptedSave: true,
  //         errors: {
  //           platform: !isPlatformValid,
  //           linkUrl: !isLinkValid,
  //         },
  //       };
  //     }

  //     return {
  //       ...link,
  //       attemptedSave: false,
  //       errors: { platform: false, linkUrl: false },
  //     };
  //   });

  //   if (allValid) {
  //     setLinks(updatedLinks);
  //     setSnackbarType('success');
  //     setOpen(true);
  //     setUniqueLinks(true);
  //   } else {
  //     setCustomizableLinks(updatedLinks);
  //     setSnackbarType('error');
  //     setOpen(true);
  //     if (!uniquePlatforms) {
  //       setUniqueLinks(false);
  //     }
  //   }
  // };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const renderLinks = () => {
    if (!userLinks) return;

    return (
      <StyledCustomizableLinkWrapper>
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={customizableLinks}
            strategy={verticalListSortingStrategy}
          >
            {customizableLinks.map((link, index) => (
              <CustomizableLink
                key={link.id}
                link={link}
                index={index}
                setNewLinks={setCustomizableLinks}
                isBeingDragged={link.isBeingDragged}
              />
            ))}
          </SortableContext>
        </DndContext>
      </StyledCustomizableLinkWrapper>
    );
  };

  const renderSnackbar = () => (
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
      <StyledAlert
        onClose={handleClose}
        severity={snackbarType}
        sx={{ width: '100%' }}
      >
        {snackbarType === 'success'
          ? 'Saved successfully'
          : // : uniqueLinks
            'Oops! Some fields need attention'}
        {/* // : 'Platforms must be unique'} */}
      </StyledAlert>
    </Snackbar>
  );

  if (isUserLoading || userLinksLoading)
    return <CircularProgress color='primary' sx={{ margin: 'auto' }} />;

  return (
    <>
      <LinksPreview />
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
          {userLinks?.length === 0 ? <StartCard /> : renderLinks()}
        </StyledHomeContainer>
        <StyledSaveButtonWrapper>
          <Button variant='contained' text='Save' onClick={handleSubmit} />
        </StyledSaveButtonWrapper>

        {renderSnackbar()}
      </StyledHome>
    </>
  );
};

export default Home;
