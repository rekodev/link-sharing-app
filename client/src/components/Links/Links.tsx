import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CircularProgress, Snackbar } from '@mui/material';
import { HttpStatusCode } from 'axios';
import isUrl from 'is-url';
import { SyntheticEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  StyledLinks,
  StyledLinksContainer,
  StyledSaveButtonWrapper,
} from './style';
import { updateLinks } from '../../api';
import CustomizableLink from '../../components/CustomizableLink';
import { StyledCustomizableLinkWrapper } from '../../components/CustomizableLink/style';
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
import { transformCustomizableLink } from '../../utils/transformers';
import Button from '../shared/Button';

const Links = () => {
  const { user, isUserLoading } = useUser();
  const {
    links: userLinks,
    isLinksLoading: isUserLinksLoading,
    mutateLinks,
  } = useUserLinks();
  const [customizableLinks, setCustomizableLinks] = useState<
    Array<CustomizableLinkType>
  >([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState<SnackbarType>('success');
  // const [uniqueLinks, setUniqueLinks] = useState(true);

  const { onDragStart, onDragEnd } = useDragHandlers({
    customizableLinks,
    setCustomizableLinks,
  });

  const handleAddNewLink = () => {
    if (!user?.id) return;

    const newLink = {
      id: uuidv4(),
      platform: platforms[0].name,
      linkUrl: '',
      attemptedSave: false,
      errors: { platform: false, linkUrl: false },
      isBeingDragged: false,
    };

    const newCustomizableLinks = [...customizableLinks, newLink];
    const transformedLinks = newCustomizableLinks.map((link) =>
      transformCustomizableLink(user.id!, link)
    );

    setCustomizableLinks(newCustomizableLinks);
    mutateLinks({ links: transformedLinks }, false);
  };

  useEffect(() => {
    if (!userLinks) return;

    const latestLinks = userLinks.map(
      (link): CustomizableLinkType => ({
        id: uuidv4(),
        platform: link.platform,
        linkUrl: link.linkUrl,
        attemptedSave: false,
        errors: { platform: false, linkUrl: false },
        isBeingDragged: false,
      })
    );

    setCustomizableLinks(latestLinks);
  }, [userLinks]);

  const validateLink = (link: CustomizableLinkType): CustomizableLinkType => {
    const isLinkUrlValid = isUrl(link.linkUrl);
    const isLinkPlatformValid = !!link.platform;

    return {
      ...link,
      errors: { platform: !isLinkPlatformValid, linkUrl: !isLinkUrlValid },
      attemptedSave: true,
    };
  };

  const validateLinks = () => {
    const uniquePlatforms =
      new Set(customizableLinks.map((link) => link.platform)).size ===
      customizableLinks.length;

    if (!uniquePlatforms) return false;

    const validatedLinks = customizableLinks.map((link) => validateLink(link));

    const allLinksValid = !validatedLinks.find(
      (link) => link.errors.linkUrl || link.errors.platform
    );

    if (!allLinksValid) {
      setCustomizableLinks(validatedLinks);
    }

    return allLinksValid;
  };

  const handleSubmit = async () => {
    if (!user?.id) return;

    const linksToBeSubmitted: Array<UserLink> = customizableLinks.map(
      (link, index) => ({
        platform: link.platform,
        linkUrl: link.linkUrl,
        index,
      })
    );

    const linksValid = validateLinks();

    if (!linksValid) return;

    setIsSnackbarOpen(false);
    const result = await updateLinks(user.id, linksToBeSubmitted);
    setIsSnackbarOpen(true);

    if (result.status !== HttpStatusCode.Ok) {
      setSnackbarType('error');

      return;
    }

    setSnackbarType('success');
    mutateLinks();
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

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackbarOpen(false);
  };

  const renderLinks = () => {
    if (!userLinks?.length) return <StartCard />;

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
                customizableLinks={customizableLinks}
                setCustomizableLinks={setCustomizableLinks}
                isBeingDragged={link.isBeingDragged}
              />
            ))}
          </SortableContext>
        </DndContext>
      </StyledCustomizableLinkWrapper>
    );
  };

  const renderSnackbar = () => (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <StyledAlert
        onClose={handleClose}
        severity={snackbarType}
        sx={{ width: '100%' }}
      >
        {snackbarType === 'success'
          ? 'Saved successfully'
          : // : uniqueLinks
            'Error saving links. Please ensure all links are unique and have a URL present'}
        {/* // : 'Platforms must be unique'} */}
      </StyledAlert>
    </Snackbar>
  );

  if (isUserLoading || isUserLinksLoading)
    return <CircularProgress color='primary' sx={{ margin: 'auto' }} />;

  return (
    <>
      <StyledLinks>
        <StyledLinksContainer>
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
          {renderLinks()}
        </StyledLinksContainer>
        <StyledSaveButtonWrapper>
          <Button variant='contained' text='Save' onClick={handleSubmit} />
        </StyledSaveButtonWrapper>
      </StyledLinks>

      {renderSnackbar()}
    </>
  );
};

export default Links;
