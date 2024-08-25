import React, { useState } from 'react';

const LinkResource = ({ url, onEdit, onDelete }) => {
  const [link, setLink] = useState(url);

  const handleEdit = () => {
    const newLink = prompt("Enter new link:", link);
    if (newLink) {
      setLink(newLink);
      onEdit(newLink);
    }
  };

  return (
    <div className="link-resource">
      <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default LinkResource;
