import React from 'react';
import '../styles/Home.css';

const Home = ({ onNavigate }) => {
  return (
    <div className="home">
      <h1>Welcome to the Course Builder</h1>
      <p>Select an option to begin</p>
      <button onClick={onNavigate}>Go to Modules</button>
    </div>
  );
};

export default Home;
