// src/App.js
import React, { useState } from 'react';
import GameSetup from './components/GameSetup';
import ScoreTracker from './components/ScoreTracker';
import './App.css';



function App() {
  const [gameData, setGameData] = useState(null);

  const handleReset = () => {
    setGameData(null);
  };

  return (
    <div className="App">
      {!gameData ? (
        <GameSetup setGameData={setGameData} />
      ) : (
        <ScoreTracker gameData={gameData} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
