import React, { useState } from 'react';
import '../styles/FileUpload.css';

const FileUpload = ({ onAddFile }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const newResource = {
        id: Date.now(),
        name: file.name,
        url: URL.createObjectURL(file), // Create a URL for the uploaded file
      };
      onAddFile(newResource);
      setFile(null);
    }
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Add File</button>
    </div>
  );
};

export default FileUpload;
