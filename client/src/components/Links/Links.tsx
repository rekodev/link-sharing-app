import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CircularProgress, Snackbar } from '@mui/material';
import { HttpStatusCode } from 'axios';
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
import { platforms } from '../../constants/platformList';
import useDragHandlers from '../../hooks/useDragHandlers';
import useUser from '../../hooks/useUser';
import useUserLinks from '../../hooks/useUserLinks';
import { StyledAlert } from '../../styles/UtilityStyles';
import {
  CustomizableLink as CustomizableLinkType,
  UserLink,
} from '../../types/link';
import { SnackbarType } from '../../types/profileDetails';
import { transformCustomizableLink } from '../../utils/transformers';
import { validateLinksOnSubmit } from '../../validation/link';
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
  const [submissionMessage, setSubmissionMessage] = useState('');

  const { onDragStart, onDragEnd } = useDragHandlers({
    customizableLinks,
    setCustomizableLinks,
  });

  const handleAddNewLink = () => {
    if (!user?.id) return;

    if (customizableLinks.length === 5) {
      setIsSnackbarOpen(true);
      setSnackbarType('error');
      setSubmissionMessage('You cannot add more than 5 links');

      return;
    }

    const newLink = {
      id: uuidv4(),
      platform: platforms[0].name,
      linkUrl: '',
      hasErrors: false,
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
    if (!userLinks || customizableLinks.length) return;

    const latestLinks = userLinks.map(
      (link): CustomizableLinkType => ({
        id: uuidv4(),
        platform: link.platform,
        linkUrl: link.linkUrl,
        hasErrors: false,
        errors: { platform: false, linkUrl: false },
        isBeingDragged: false,
      })
    );

    setCustomizableLinks(latestLinks);
  }, [userLinks, customizableLinks]);

  const onValidationError = (validatedLinks: Array<CustomizableLinkType>) => {
    setCustomizableLinks(validatedLinks);
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

    const linksValid = validateLinksOnSubmit(
      customizableLinks,
      onValidationError
    );

    if (!linksValid) return;

    setSubmissionMessage('');
    setIsSnackbarOpen(false);
    const result = await updateLinks(user.id, linksToBeSubmitted);
    setSubmissionMessage(result.data.message);
    setIsSnackbarOpen(true);

    if (result.status !== HttpStatusCode.Ok) {
      setSnackbarType('error');

      return;
    }

    setSnackbarType('success');
    mutateLinks();
  };

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

  const renderSnackbar = () => {
    if (!submissionMessage) return null;

    return (
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
          {submissionMessage}
        </StyledAlert>
      </Snackbar>
    );
  };

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
          <Button
            variant='contained'
            text='Save'
            onClick={handleSubmit}
            disabled={!userLinks?.length}
          />
        </StyledSaveButtonWrapper>
      </StyledLinks>

      {renderSnackbar()}
    </>
  );
};

export default Links;
