import { IShareableLinkValues } from '../../types/shareableLinkValues';
import Button from '../Button';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';
import {
  StyledIconAndHeading,
  StyledLinkCard,
  StyledLinkCardTextWrapper,
} from './style';
import dragAndDropIcon from '../../assets/images/icon-drag-and-drop.svg';
import DragHandle, { IDragHandleProps } from '../DragHandle/DragHandle';

interface ILinkCardProps {
  index: number;
  link: IShareableLinkValues;
  setNewLinks: React.Dispatch<
    React.SetStateAction<[] | IShareableLinkValues[]>
  >;
  dragHandleProps: IDragHandleProps;
  isBeingDragged: boolean | undefined;
}

const LinkCard = ({
  index,
  link,
  setNewLinks,
  dragHandleProps,
  isBeingDragged,
}: ILinkCardProps) => {
  const handleRemove = () => {
    setNewLinks((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <StyledLinkCard $isBeingDragged={isBeingDragged}>
      <StyledLinkCardTextWrapper $isBeingDragged={isBeingDragged}>
        <DragHandle {...dragHandleProps} />
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
};

export default LinkCard;
