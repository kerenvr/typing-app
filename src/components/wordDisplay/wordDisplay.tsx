import React, { useRef, useEffect, useState } from "react";
import styles from './wordDisplay.module.css';
import { useTheme } from '../../themes/ThemeContext'; // Import the theme context


interface WordDisplayProps {
    words: string;
    charsTyped: string;
    wpm: number;
    cursorStopped: boolean;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ words, charsTyped, wpm, cursorStopped }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const pRef = useRef<HTMLDivElement>(null);
    const [y, setY] = useState<number>(0);
    const [prevY, setPrevY] = useState<number>(0);
    const marginTopRef = useRef<number>(0);
    const [marginTop, setMarginTop] = useState<number>(0);
    const [fontSize, setFontSize] = useState<number>(0);
    const THRESHOLD = 1.5;

    const colorsByTheme = {
        blue: {
            correct: '#2CC995',
            incorrect: '#f87171',
        },
        pink: {
            correct: '#FFD000',
            incorrect: '#f87171',
        },
        green: {
            correct: '#FF8940',
            incorrect: '#f87171',
        },
        purple: {
            correct: '#FA94FF',
            incorrect: '#f87171',
        },
    };
    const { theme } = useTheme();
    const { correct, incorrect } = colorsByTheme[theme] || colorsByTheme.blue; 

    useEffect(() => {
        if (pRef.current) {
            const fontSize = window.getComputedStyle(pRef.current).getPropertyValue('font-size');
            setFontSize(parseInt(fontSize));
        }
    }, []);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setY(rect.y);
        }
    }, [charsTyped]);

    useEffect(() => {
        if ((prevY - y) === (fontSize * 3)) {
            marginTopRef.current += (fontSize * THRESHOLD);
            setMarginTop(marginTopRef.current);
            return;
        }
        
        if (y === prevY) {
            marginTopRef.current -= (fontSize * THRESHOLD);
            setMarginTop(marginTopRef.current);
        }

        if (prevY !== y && prevY !== 0 && prevY < y) {
            marginTopRef.current -= (fontSize * THRESHOLD);
            setMarginTop(marginTopRef.current);
        }
        setPrevY(y);
    }, [y]);

    return (
        <div className={styles.container}>
            <p ref={pRef} className={styles.words} style={{ marginTop: `${marginTop}px` }}>
                {words.split('').map((char, index) => {
                    let color;
                    let bgColor;
                    let underline;

                    if (index < charsTyped.length) {
                        color = char === charsTyped[index] ? correct : 'white';
                        underline = char === charsTyped[index] ? 'none' : 'underline';
                        bgColor = char === charsTyped[index] ? 'transparent' : '#f87171';
                    }

                    return (
                        <span 
                            key={index}
                            style={{
                                backgroundColor: bgColor,
                                textDecorationColor: bgColor,
                                color,
                            }}
                        >
                            {char}
                            {index === charsTyped.length - 1 && !cursorStopped && <span ref={ref} className="cursor"></span>}
                        </span>
                    );
                })}
            </p>
        </div>
    );
};

export default WordDisplay;
