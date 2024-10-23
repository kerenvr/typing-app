import React, { useState } from 'react';

const DifficultySelector = ({ setDifficulty, difficulty }) => {
  // State to hold the current difficulty level

  // Function to handle button clicks
  const handleDifficultyChange = (level) => {
    setDifficulty(level);
  };
  console.log('Current Difficulty in Typing:', difficulty);


  return (
    <div>
    <h2>Current Difficulty: {difficulty}</h2>

      <div>
        {['1', '2', '3', '4', '5'].map((level) => (
          <button key={level} onClick={() => handleDifficultyChange(level)}>
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;
