import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

import { StyledDragHandle } from './style';

export interface IDragHandleProps {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
}

const DragHandle = ({ attributes, listeners }: IDragHandleProps) => {
  return (
    <StyledDragHandle {...attributes} {...listeners} className='drag-handle' />
  );
};

export default DragHandle;
