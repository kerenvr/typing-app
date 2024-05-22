import React, { useRef, useEffect, useState } from "react";
import styles from './wordDisplay.module.css';

interface WordDisplayProps {
    words: string;
    wordsTyped: string;
}

const calculateTopPosition = (elementRef: React.RefObject<HTMLDivElement>) => {
    const element = elementRef.current;
    if (!element) return 0; // Return 0 if the element is not found
    const rect = element.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    return rect.top + scrollTop;
};
  
const WordDisplay: React.FC<WordDisplayProps> = ({ words, wordsTyped }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [change, setChange] = useState(false);
    const [topPosition, setTopPosition] = useState(0);
    const [marginTop, setMarginTop] = useState(0);
    const [changeAmount, setChangeAmount] = useState(0);

    useEffect(() => {
        const newTopPosition = calculateTopPosition(elementRef);
        setTopPosition(newTopPosition);
        if (newTopPosition !== topPosition && topPosition !== 0 && newTopPosition > topPosition) {
            const newChangeAmount = changeAmount + 1;
            setChangeAmount(newChangeAmount);
            setChange(newChangeAmount % 2 === 0);
            console.log("change", newChangeAmount);
        } else {
            setChange(false);
        }
    }, [words, wordsTyped, changeAmount, topPosition]);

    useEffect(() => {
        if (change) {
            setMarginTop(prevMarginTop => prevMarginTop - 45); // Decrease marginTop by 45
        }
    }, [change]);

    return (
        <div className={styles.container}>
            <p className={styles.words}  style={{ marginTop: `${marginTop}px`}}>
                {words.split('').map((char, index) => {
                    let color;
                    if (index < wordsTyped.length) {
                        color = char === wordsTyped[index] ? 'black' : 'red';
                    }
                    return (
                        <span key={index} style={{ color: color }}>
                            {char}
                            {index === wordsTyped.length - 1 && <span ref={elementRef} className="cursor"></span>}
                        </span>
                    );
                })}
            </p>
        </div>
    );
};

export default WordDisplay;
