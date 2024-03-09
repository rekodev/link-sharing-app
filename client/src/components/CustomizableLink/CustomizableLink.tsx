import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Dispatch, SetStateAction } from 'react';

import {
  StyledIconAndHeading,
  StyledLinkCard,
  StyledLinkCardTextWrapper,
  StyledCustomizableLink,
} from './style';
import dragAndDropIcon from '../../assets/images/icon-drag-and-drop.svg';
import { CustomizableLink as CustomizableLinkType } from '../../types/link';
import Button from '../Button';
import DragHandle from '../DragHandle';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';

type Props = {
  link: CustomizableLinkType;
  index: number;
  setNewLinks: Dispatch<SetStateAction<Array<CustomizableLinkType>>>;
  isBeingDragged: boolean | undefined;
};

const CustomizableLink = ({
  link,
  index,
  setNewLinks,
  isBeingDragged,
}: Props) => {
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
        isError={link.errors.linkUrl && link.attemptedSave}
      />
    </StyledLinkCard>
  );

  return (
    <StyledCustomizableLink
      $isBeingDragged={isBeingDragged}
      ref={setNodeRef}
      style={style}
      className='link'
    >
      {renderLinkCard()}
    </StyledCustomizableLink>
  );
};

export default CustomizableLink;
