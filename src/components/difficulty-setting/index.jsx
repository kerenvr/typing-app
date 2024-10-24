import React, { useState } from 'react';
import styles from "./difficulty-setting.module.css";


const DifficultySelector = ({ setDifficulty, difficulty }) => {
  // State to hold the current difficulty level

  // Function to handle button clicks
  const handleDifficultyChange = (level) => {
    setDifficulty(level);
  };

  return (
    <div className={styles.container}>
    <h2>Difficulty: {difficulty}</h2>

    <div className={styles.changedifficulty}>
        <h2>Change Difficulty: </h2>

        <div className={styles.btn}>
            {['1', '2', '3', '4', '5'].map((level) => (
            <button key={level} onClick={() => handleDifficultyChange(level)}>
                {level}
            </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DifficultySelector;
