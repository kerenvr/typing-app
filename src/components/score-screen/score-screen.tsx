import React from 'react'
import styles from './score-screen.module.css'

interface ScoreScreenProps {
    wpm: number;
    seconds: number;
    totalWords: number;
}

const ScoreScreen: React.FC<ScoreScreenProps> = ({ wpm, seconds, totalWords }) => {
  return (
    <>
    <div>
        <div>
            <p>You typed {totalWords} words in {seconds} seconds with {wpm} WPM. </p>
        </div>
    </div>
    </>
  );
}

export default ScoreScreen