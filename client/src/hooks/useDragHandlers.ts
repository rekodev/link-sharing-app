import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Dispatch, SetStateAction } from 'react';

import useUser from './useUser';
import useUserLinks from './useUserLinks';
import { CustomizableLink } from '../types/link';
import { transformCustomizableLink } from '../utils/transformers';

type Props = {
  customizableLinks: Array<CustomizableLink>;
  setCustomizableLinks: Dispatch<SetStateAction<Array<CustomizableLink>>>;
};

const useDragHandlers = ({
  customizableLinks,
  setCustomizableLinks,
}: Props) => {
  const { user } = useUser();
  const { mutateLinks } = useUserLinks();

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const linkIndex = customizableLinks.findIndex(
      (link) => link.id === active.id
    );

    // setting isBeingDragged to true
    setCustomizableLinks((prev) =>
      prev.map((link, index) =>
        index === linkIndex ? { ...link, isBeingDragged: true } : link
      )
    );
  };

  const onDragEnd = (event: DragEndEvent) => {
    if (!user?.id) return;

    const { active, over } = event;
    const oldIndex = customizableLinks.findIndex(
      (link) => link.id === active.id
    );
    const newIndex = customizableLinks.findIndex(
      (link) => link.id === over?.id
    );

    // if no switch made
    if (active.id === over?.id) {
      setCustomizableLinks((prev) =>
        prev.map((link, index) =>
          index === oldIndex ? { ...link, isBeingDragged: false } : link
        )
      );

      return;
    }

    setCustomizableLinks((prev) => {
      // arrayMove rearranges the links, but it doesn't change their index value inside the object
      const newCustomizableLinks = arrayMove(prev, oldIndex, newIndex).map(
        (link) => ({ ...link })
      );
      const newLinks = newCustomizableLinks.map((link) =>
        transformCustomizableLink(user.id!, link)
      );

      mutateLinks({ links: newLinks }, false);

      return newCustomizableLinks;
    });

    // setting isBeingDragged to false
    setCustomizableLinks((prev) =>
      prev.map((link, idx) =>
        idx === newIndex ? { ...link, isBeingDragged: false } : link
      )
    );
  };

  return { onDragStart, onDragEnd };
};

export default useDragHandlers;
