// src/components/ScoreTracker.js
import React, { useState } from 'react';
import './ScoreTracker.css'; // إضافة ملف CSS

function ScoreTracker({ gameData, onReset }) {
  const [rounds, setRounds] = useState([]);
  const [currentRoundScores, setCurrentRoundScores] = useState(Array(gameData.players.length).fill(0));
  const [editMode, setEditMode] = useState(false);
  const [editRoundIndex, setEditRoundIndex] = useState(null);
  const [editScores, setEditScores] = useState([]);

  const handleScoreChange = (index, e) => {
    const newScores = [...currentRoundScores];
    newScores[index] = parseInt(e.target.value) || 0;
    setCurrentRoundScores(newScores);
  };

  const handleNextRound = () => {
    setRounds([currentRoundScores, ...rounds]);
    setCurrentRoundScores(Array(gameData.players.length).fill(0));
  };

  const handleEditRound = (roundIndex) => {
    setEditMode(true);
    setEditRoundIndex(roundIndex);
    setEditScores(rounds[roundIndex]);
  };

  const handleEditScoreChange = (index, e) => {
    const newScores = [...editScores];
    newScores[index] = parseInt(e.target.value) || 0;
    setEditScores(newScores);
  };

  const handleConfirmEdit = () => {
    const newRounds = [...rounds];
    newRounds[editRoundIndex] = editScores;
    setRounds(newRounds);
    setEditMode(false);
    setEditRoundIndex(null);
    setEditScores([]);
  };

  const handleDeleteRound = (roundIndex) => {
    setRounds(rounds.filter((_, index) => index !== roundIndex));
  };

  const calculateTotalScore = (playerIndex) => {
    return rounds.reduce((total, round) => total + round[playerIndex], 0);
  };

  return (
    <div className="score-tracker">
      <div className="header">
        <h1>Score Tracker</h1>
        <button onClick={onReset}>Return to Setup</button>
        <div className="total-scores">
          {gameData.players.map((player, index) => (
            <div key={index} className="player-score">
              <h2>{player.name}</h2>
              <p><span>Total Score:</span> {calculateTotalScore(index)}</p>
              <input
                type="number"
                value={currentRoundScores[index]}
                onChange={(e) => handleScoreChange(index, e)}
              />
            </div>
          ))}
        </div>
        <button onClick={handleNextRound}>Next Round</button>
      </div>





      {editMode && (
        <div className="edit-mode">
          <h2 style={{color:"orange"}}>Edit Round {rounds.length - editRoundIndex}</h2>
          <div className="edit-scores">
            {gameData.players.map((player, index) => (
              <div key={index} className="player-edit-score">
                <h2>{player.name}</h2>
                <input
                  type="number"
                  value={editScores[index]}
                  onChange={(e) => handleEditScoreChange(index, e)}
                />
              </div>
            ))}
            </div>
          <div className="edit-buttons"  >
          <button onClick={handleConfirmEdit}>Confirm</button>
          <button onClick={() => setEditMode(false)}>Close</button>
          </div>
        </div>
      )}
      



      <div className="rounds">
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="round">
            <h3>Round {rounds.length - roundIndex}</h3>
            <div className="round-scores">
              {round.map((score, playerIndex) => (
                <p key={playerIndex}><span>{gameData.players[playerIndex].name}:</span> {score}</p>
              ))}
              <div className='buttons'> 
              <button  style={{background:"orange"}} onClick={() => handleEditRound(roundIndex)}>Edit</button>
              <button style={{background:"red"}} onClick={() => handleDeleteRound(roundIndex)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
}

export default ScoreTracker;
