import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dispatch, SetStateAction } from "react";

import {
  StyledCustomizableLink,
  StyledIconAndHeading,
  StyledLinkCard,
  StyledLinkCardTextWrapper,
} from "./style";
import dragAndDropIcon from "../../assets/images/icon-drag-and-drop.svg";
import useUser from "../../hooks/useUser";
import useUserLinks from "../../hooks/useUserLinks";
import { CustomizableLink as CustomizableLinkType } from "../../types/link";
import { transformCustomizableLink } from "../../utils/transformers";
import CustomizableLinkSelect from "../CustomizableLinkSelect";
import CustomizableLinkText from "../CustomizableLinkText";
import DragHandle from "../DragHandle";
import Button from "../shared/Button";

type Props = {
  link: CustomizableLinkType;
  index: number;
  setCustomizableLinks: Dispatch<SetStateAction<Array<CustomizableLinkType>>>;
  isBeingDragged: boolean | undefined;
};

const CustomizableLink = ({
  link,
  index: linkIndex,
  setCustomizableLinks,
  isBeingDragged,
}: Props) => {
  const { user } = useUser();
  const { mutateLinks } = useUserLinks();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  const removeAndUpdateLinks = (
    links: Array<CustomizableLinkType>,
    indexToRemove: number,
    userId: number
  ) => {
    const newCustomizableLinks = links.filter(
      (_, index) => index !== indexToRemove
    );

    const newLinks = newCustomizableLinks.map((link) =>
      transformCustomizableLink(userId, link)
    );

    mutateLinks({ links: newLinks }, false);

    return newCustomizableLinks;
  };

  const handleRemove = () => {
    if (!user?.id) return;

    setCustomizableLinks((prev) =>
      removeAndUpdateLinks(prev, linkIndex, user.id!)
    );
  };

  const renderLinkCard = () => (
    <StyledLinkCard $isBeingDragged={isBeingDragged}>
      <StyledLinkCardTextWrapper $isBeingDragged={isBeingDragged}>
        <DragHandle attributes={attributes} listeners={listeners} />
        <StyledIconAndHeading>
          <img src={dragAndDropIcon} alt="Drag and Drop Icon" />
          <h4>Link #{linkIndex + 1}</h4>
        </StyledIconAndHeading>
        <Button text="Remove" variant="text" onClick={handleRemove} />
      </StyledLinkCardTextWrapper>
      <CustomizableLinkSelect
        link={link}
        index={linkIndex}
        setCustomizableLinks={setCustomizableLinks}
        isError={link.errors.platform && link.attemptedSave}
      />
      <CustomizableLinkText
        link={link}
        index={linkIndex}
        setCustomizableLinks={setCustomizableLinks}
        isError={link.errors.linkUrl && link.attemptedSave}
      />
    </StyledLinkCard>
  );

  return (
    <StyledCustomizableLink
      $isBeingDragged={isBeingDragged}
      ref={setNodeRef}
      style={style}
      className="link"
    >
      {renderLinkCard()}
    </StyledCustomizableLink>
  );
};

export default CustomizableLink;
