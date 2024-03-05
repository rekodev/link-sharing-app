import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Dispatch, SetStateAction } from 'react';

import { IShareableLinkValues } from '../types/shareableLinkValues';

type Props = {
  newLinks: Array<IShareableLinkValues>;
  setNewLinks: Dispatch<SetStateAction<Array<IShareableLinkValues>>>;
};

const useDragHandlers = ({ newLinks, setNewLinks }: Props) => {
  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const index = newLinks.findIndex((link) => link.id === active.id);

    // setting isBeingDragged to true
    setNewLinks((prev) =>
      prev.map((link, idx) =>
        idx === index ? { ...link, isBeingDragged: true } : link
      )
    );
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const oldIndex = newLinks.findIndex((link) => link.id === active.id);
    const newIndex = newLinks.findIndex((link) => link.id === over?.id);

    // if no switch made
    if (active.id === over?.id) {
      setNewLinks((prev) =>
        prev.map((link, idx) =>
          idx === oldIndex ? { ...link, isBeingDragged: false } : link
        )
      );

      return;
    }

    setNewLinks((prev) => arrayMove(prev, oldIndex, newIndex));

    // setting isBeingDragged to false
    setNewLinks((prev) =>
      prev.map((link, idx) =>
        idx === newIndex ? { ...link, isBeingDragged: false } : link
      )
    );
  };

  return { onDragStart, onDragEnd };
};

export default useDragHandlers;
