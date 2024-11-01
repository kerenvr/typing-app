import React from 'react';
import styles from "./difficulty-setting.module.css";

const DifficultySelector = ({ setDifficulty, difficulty }) => {
  // Function to handle difficulty change
  const handleDifficultyChange = (event) => {
    const level = Number(event.target.value);
    setDifficulty(level);
  };

  return (
    <div className={styles.container}>
      {/* <h2>Difficulty: {difficulty}</h2> */}

      <div className={styles.changedifficulty}>
        <h2>Difficulty</h2>

        <select value={difficulty} onChange={handleDifficultyChange} className={styles.dropdown}>
          <option value="" disabled>Select Difficulty</option>
          {[1, 2, 3, 4, 5].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DifficultySelector;
