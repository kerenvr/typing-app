import React from "react";
import styles from './wordDisplay.module.css';

interface WordDisplayProps {
    words: string;
    wordsTyped: string;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ words, wordsTyped }) => (
    <div className={styles.container}>
        <p className={styles.words}>
            {words.split('').map((char, index) => {
                let color;
                if (index < wordsTyped.length) {
                    color = char === wordsTyped[index] ? 'black' : 'red';
                }
                return (
                    <span key={index} style={{ color: color }}>
                        {char}
                        {index === wordsTyped.length - 1 && <span className="cursor"></span>}
                    </span>
                );
            })}
        </p>
    </div>
);

export default WordDisplay;
