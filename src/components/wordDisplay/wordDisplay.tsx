import React from "react";

interface WordDisplayProps {
    words: string;
    wordsTyped: string;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ words, wordsTyped }) => (
    <p className="text-gray-400">
        {words.split('').map((char, index) => {
            let color;
            if (index < wordsTyped.length) {
                color = char === wordsTyped[index] ? 'black' : 'red';
            }
            return (
                <span
                    key={index} style={{ color: color }}>
                    {char}
                    {index === wordsTyped.length - 1 && <span className="cursor"></span>}
                </span>
            );
        })}

    </p>
);

export default WordDisplay;