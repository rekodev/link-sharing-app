import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Dispatch, SetStateAction } from 'react';

import {
  StyledCustomizableLink,
  StyledIconAndHeading,
  StyledLinkCard,
  StyledLinkCardTextWrapper,
} from './style';
import dragAndDropIcon from '../../assets/images/icon-drag-and-drop.svg';
import useUser from '../../hooks/useUser';
import useUserLinks from '../../hooks/useUserLinks';
import { CustomizableLink as CustomizableLinkType } from '../../types/link';
import { transformCustomizableLink } from '../../utils/transformers';
import CustomizableLinkSelect from '../CustomizableLinkSelect';
import CustomizableLinkText from '../CustomizableLinkText';
import DragHandle from '../DragHandle';
import Button from '../shared/Button';

type Props = {
  link: CustomizableLinkType;
  index: number;
  customizableLinks: Array<CustomizableLinkType>;
  setCustomizableLinks: Dispatch<SetStateAction<Array<CustomizableLinkType>>>;
  isBeingDragged: boolean | undefined;
};

const CustomizableLink = ({
  link,
  index: linkIndex,
  customizableLinks,
  setCustomizableLinks,
  isBeingDragged,
}: Props) => {
  const { user } = useUser();
  const { mutateLinks } = useUserLinks();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  const handleRemove = () => {
    if (!user?.id) return;

    const newCustomizableLinks = customizableLinks.filter(
      (_, index) => index !== linkIndex
    );
    const newLinks = newCustomizableLinks.map((link) =>
      transformCustomizableLink(user.id!, link)
    );

    setCustomizableLinks(newCustomizableLinks);
    mutateLinks({ links: newLinks }, false);
  };

  const renderLinkCard = () => (
    <StyledLinkCard $isBeingDragged={isBeingDragged}>
      <StyledLinkCardTextWrapper $isBeingDragged={isBeingDragged}>
        <DragHandle attributes={attributes} listeners={listeners} />
        <StyledIconAndHeading>
          <img src={dragAndDropIcon} alt='Drag and Drop Icon' />
          <h4>Link #{linkIndex + 1}</h4>
        </StyledIconAndHeading>
        <Button text='Remove' variant='text' onClick={handleRemove} />
      </StyledLinkCardTextWrapper>
      <CustomizableLinkSelect
        link={link}
        index={linkIndex}
        customizableLinks={customizableLinks}
        setCustomizableLinks={setCustomizableLinks}
        isError={link.errors.platform && link.hasErrors}
      />
      <CustomizableLinkText
        link={link}
        index={linkIndex}
        customizableLinks={customizableLinks}
        setCustomizableLinks={setCustomizableLinks}
        isError={link.errors.linkUrl && link.hasErrors}
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
