import React from 'react';
import '../styles/Resource.css';

const Resource = ({ resource, onRename, onDelete }) => {
  const handleResourceClick = () => {
    // Open the resource in a new tab
    window.open(resource.url, '_blank');
  };

  return (
    <div className="resource-card">
      <div className="resource-card-header">
        <span className="resource-name" onClick={handleResourceClick}>
          {resource.name}
        </span>
        <button onClick={() => onRename(prompt('Enter new name:', resource.name))}>Rename</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Resource;
