import React, { useState } from 'react';
import Home from './components/Home';
import Module from './components/Module';
import Resource from './components/Resource';
import FileUpload from './components/FileUpload';
import DragAndDropContainer from './components/DragAndDropContainer';
import './styles/App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [modules, setModules] = useState([]);

  const addModule = () => {
    const newModule = { id: Date.now(), name: 'New Module', resources: [] };
    setModules([...modules, newModule]);
  };

  const renameModule = (id, newName) => {
    setModules(modules.map(mod => mod.id === id ? { ...mod, name: newName } : mod));
  };

  const deleteModule = (id) => {
    setModules(modules.filter(mod => mod.id !== id));
  };

  const addFileToModule = (moduleId, file) => {
    setModules(modules.map(mod =>
      mod.id === moduleId ? { ...mod, resources: [...mod.resources, { id: Date.now(), ...file }] } : mod
    ));
  };

  const renameResource = (moduleId, resourceId, newName) => {
    setModules(modules.map(mod =>
      mod.id === moduleId ? {
        ...mod,
        resources: mod.resources.map(res => res.id === resourceId ? { ...res, name: newName } : res)
      } : mod
    ));
  };

  const deleteResource = (moduleId, resourceId) => {
    setModules(modules.map(mod =>
      mod.id === moduleId ? { ...mod, resources: mod.resources.filter(res => res.id !== resourceId) } : mod
    ));
  };

  const moveResource = (fromIndex, toIndex) => {
    const draggedModule = modules[fromIndex];
    const targetModule = modules[toIndex];

    setModules(modules.map((mod, index) => {
      if (index === fromIndex) {
        return { ...mod, resources: [] };
      }
      if (index === toIndex) {
        return { ...mod, resources: [...mod.resources, ...draggedModule.resources] };
      }
      return mod;
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'home' && (
        <Home onNavigate={() => handlePageChange('modules')} />
      )}
      {currentPage === 'modules' && (
        <div className="App">
          <button onClick={addModule}>Add Module</button>
          {modules.map((mod, index) => (
            <DragAndDropContainer
              key={mod.id}
              item={{ ...mod, type: 'MODULE' }}
              index={index}
              moveItem={moveResource}
            >
              <Module
                name={mod.name}
                onRename={(newName) => renameModule(mod.id, newName)}
                onDelete={() => deleteModule(mod.id)}
              >
                <FileUpload onAddFile={(file) => addFileToModule(mod.id, file)} />
                {mod.resources.map((resource, resIndex) => (
                  <DragAndDropContainer
                    key={resource.id}
                    item={{ ...resource, type: 'RESOURCE' }}
                    index={resIndex}
                    moveItem={(fromIndex, toIndex) => moveResource(mod.id, fromIndex, toIndex)}
                  >
                    <Resource
                      resource={resource}
                      onRename={(newName) => renameResource(mod.id, resource.id, newName)}
                      onDelete={() => deleteResource(mod.id, resource.id)}
                    />
                  </DragAndDropContainer>
                ))}
              </Module>
            </DragAndDropContainer>
          ))}
          <button onClick={() => handlePageChange('home')}>Back to Home</button>
        </div>
      )}
    </div>
  );
};

export default App;