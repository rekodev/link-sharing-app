import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Dispatch, SetStateAction } from 'react';

import {
  StyledIconAndHeading,
  StyledLinkCard,
  StyledLinkCardTextWrapper,
  StyledSortableLink,
} from './style';
import dragAndDropIcon from '../../assets/images/icon-drag-and-drop.svg';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import Button from '../Button';
import DragHandle from '../DragHandle';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';

type Props = {
  link: IShareableLinkValues;
  index: number;
  setNewLinks: Dispatch<SetStateAction<Array<IShareableLinkValues>>>;
  isBeingDragged: boolean | undefined;
};

const SortableLink = ({ link, index, setNewLinks, isBeingDragged }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  const handleRemove = () => {
    setNewLinks((prev) => prev.filter((_, idx) => idx !== index));
  };

  const renderLinkCard = () => (
    <StyledLinkCard $isBeingDragged={isBeingDragged}>
      <StyledLinkCardTextWrapper $isBeingDragged={isBeingDragged}>
        <DragHandle attributes={attributes} listeners={listeners} />
        <StyledIconAndHeading>
          <img src={dragAndDropIcon} alt='Drag and Drop Icon' />
          <h4>Link #{index + 1}</h4>
        </StyledIconAndHeading>
        <Button text='Remove' variant='text' onClick={handleRemove} />
      </StyledLinkCardTextWrapper>
      <SelectInput
        link={link}
        index={index}
        setNewLinks={setNewLinks}
        isError={link.errors.platform && link.attemptedSave}
      />
      <TextInput
        link={link}
        index={index}
        setNewLinks={setNewLinks}
        isError={link.errors.link && link.attemptedSave}
      />
    </StyledLinkCard>
  );

  return (
    <StyledSortableLink
      $isBeingDragged={isBeingDragged}
      ref={setNodeRef}
      style={style}
      className='link'
    >
      {renderLinkCard()}
    </StyledSortableLink>
  );
};

export default SortableLink;
