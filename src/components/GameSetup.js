// src/components/GameSetup.js

import React, { useState } from 'react';

function GameSetup({ setGameData }) {
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState([{ name: '', score: 0 }, { name: '', score: 0 }]);
  const [maxScore, setMaxScore] = useState(1200);
  const [showSetup, setShowSetup] = useState(false); // حالة للتحكم في عرض النموذج

  const handleNumPlayersChange = (e) => {
    const num = parseInt(e.target.value);
    setNumPlayers(num);
    setPlayers(Array.from({ length: num }, () => ({ name: '', score: 0 })));
  };

  const handlePlayerNameChange = (index, e) => {
    const newPlayers = [...players];
    newPlayers[index].name = e.target.value;
    setPlayers(newPlayers);
  };

  const handleSubmit = () => {
    const defaultNames = ['Player A', 'Player B', 'Player C', 'Player D'];
    const newPlayers = players.map((player, index) => ({
      ...player,
      name: player.name.trim() === '' ? defaultNames[index] : player.name
    }));
    setGameData({ players: newPlayers, maxScore });
  };

  return (
    <div>
      {!showSetup && <button onClick={() => setShowSetup(true)}>Create Game</button>}
      {showSetup && (
        <div className='setup'>
          <h1>Game Setup</h1>
          <div>
            <label>Number of Players: </label>
            <select value={numPlayers} onChange={handleNumPlayersChange}>
              {[2, 3, 4].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          {players.map((player, index) => (
            <div key={index}>
              <label>Player {index + 1} Name: </label>
              <input
                type="text"
                value={player.name}
                onChange={(e) => handlePlayerNameChange(index, e)}
              />
            </div>
          ))}
          <div>
            <label>Max Score: </label>
            <input
              type="number"
              value={maxScore}
              onChange={(e) => setMaxScore(parseInt(e.target.value))}
            />
          </div>
          <button onClick={handleSubmit}>Start Game</button>
        </div>
      )}
    </div>
  );
}

export default GameSetup;

/*
import React, { useState } from 'react';

function GameSetup({ setGameData }) {
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState([{ name: '', score: 0 }, { name: '', score: 0 }]);
  const [maxScore, setMaxScore] = useState(1200);

  const handleNumPlayersChange = (e) => {
    const num = parseInt(e.target.value);
    setNumPlayers(num);
    setPlayers(Array.from({ length: num }, () => ({ name: '', score: 0 })));
  };

  const handlePlayerNameChange = (index, e) => {
    const newPlayers = [...players];
    newPlayers[index].name = e.target.value;
    setPlayers(newPlayers);
  };

  const handleSubmit = () => {
    const defaultNames = ['Player A', 'Player B', 'Player C', 'Player D'];
    const newPlayers = players.map((player, index) => ({
      ...player,
      name: player.name.trim() === '' ? defaultNames[index] : player.name
    }));
    setGameData({ players: newPlayers, maxScore });
  };

  return (
    <div className='setup'>
      <h1>Game Setup</h1>
      <div>
        <label>Number of Players: </label>
        <select value={numPlayers} onChange={handleNumPlayersChange}>
          {[2, 3, 4].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      {players.map((player, index) => (
        <div key={index}>
          <label>Player {index + 1} Name: </label>
          <input
            type="text"
            value={player.name}
            onChange={(e) => handlePlayerNameChange(index, e)}
          />
        </div>
      ))}
      <div>
        <label>Max Score: </label>
        <input
          type="number"
          value={maxScore}
          onChange={(e) => setMaxScore(parseInt(e.target.value))}
        />
      </div>
      <button onClick={handleSubmit}>Start Game</button>
    </div>
  );
}

export default GameSetup;

*/
