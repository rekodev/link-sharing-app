import { DraggableAttributes } from '@dnd-kit/core';
// eslint-disable-next-line import/no-unresolved
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

import { StyledDragHandle } from './style';

type Props = {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
};

const DragHandle = ({ attributes, listeners }: Props) => {
  return (
    <StyledDragHandle {...attributes} {...listeners} className='drag-handle' />
  );
};

export default DragHandle;
