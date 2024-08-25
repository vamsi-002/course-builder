import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

// Define item types for drag-and-drop
const ItemTypes = {
  MODULE: 'MODULE',
  RESOURCE: 'RESOURCE',
};

const DragAndDropContainer = ({ item, index, moveItem, children }) => {
  const [, ref] = useDrop({
    accept: [ItemTypes.MODULE, ItemTypes.RESOURCE],
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: item.type, // Use type based on item type (MODULE or RESOURCE)
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div ref={(node) => drag(ref(node))} style={{ opacity }}>
      {children}
    </div>
  );
};

export default DragAndDropContainer;
