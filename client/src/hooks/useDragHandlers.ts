import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Dispatch, SetStateAction } from 'react';

import { CustomizableLink } from '../types/link';

type Props = {
  customizableLinks: Array<CustomizableLink>;
  setCustomizableLinks: Dispatch<SetStateAction<Array<CustomizableLink>>>;
};

const useDragHandlers = ({
  customizableLinks,
  setCustomizableLinks,
}: Props) => {
  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const index = customizableLinks.findIndex((link) => link.id === active.id);

    console.log(index);

    // setting isBeingDragged to true
    setCustomizableLinks((prev) =>
      prev.map((link, idx) =>
        idx === index ? { ...link, isBeingDragged: true, index: idx } : link
      )
    );
  };

  const onDragEnd = (event: DragEndEvent) => {
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
        prev.map((link, idx) =>
          idx === oldIndex
            ? { ...link, isBeingDragged: false, index: idx }
            : link
        )
      );

      return;
    }

    setCustomizableLinks((prev) => arrayMove(prev, oldIndex, newIndex));

    // setting isBeingDragged to false
    setCustomizableLinks((prev) =>
      prev.map((link, idx) =>
        idx === newIndex ? { ...link, isBeingDragged: false, index: idx } : link
      )
    );
  };

  return { onDragStart, onDragEnd };
};

export default useDragHandlers;
