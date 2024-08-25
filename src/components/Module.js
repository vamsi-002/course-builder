import React, { useState } from 'react';
import '../styles/Module.css';

const Module = ({ name, onRename, onDelete, children }) => {
  const [moduleName, setModuleName] = useState(name);

  const handleRename = () => {
    const newName = prompt("Enter new module name:", moduleName);
    if (newName) {
      setModuleName(newName);
      onRename(newName);
    }
  };

  return (
    <div className="module-card">
      <div className="module-card-header">
        <h3>{moduleName}</h3>
        <div>
          <button onClick={handleRename}>Rename</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
      <div className="module-card-content">
        {children}
      </div>
    </div>
  );
};

export default Module;
