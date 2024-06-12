import React, { useRef, useEffect, useState } from "react";
import styles from './wordDisplay.module.css';

interface WordDisplayProps {
    words: string;
    charsTyped: string;
    wpm: number;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ words, charsTyped, wpm }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const pRef = useRef<HTMLDivElement>(null);
    const [y, setY] = useState<number>(0);
    const [prevY, setPrevY] = useState<number>(0);
    const marginTopRef = useRef<number>(0);
    const [marginTop, setMarginTop] = useState<number>(0);
    const [fontSize, setFontSize] = useState<number>(0);
    const THRESHOLD = 1.5;
    const [value, setValue] = useState<number>(0);

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
        
        const targetDelta = 3 * fontSize;
        const deltaY = prevY - y;
        setValue(prevValue => prevValue + 1);

        console.log("y: ", y, "prevY: ", prevY, y-prevY, marginTop, value)

        if (deltaY === targetDelta) {
            console.log("increased!" )
            marginTopRef.current += ((fontSize * THRESHOLD)); // Decrease margin top by targetDelta
            setMarginTop(marginTopRef.current);
            return
        }

        // if ((prevY - y) === (fontSize * 3)) {
        //     marginTopRef.current = marginTopRef.current + (fontSize * THRESHOLD);
        //     setMarginTop(marginTopRef.current);
        //     return;
        // }
        
        // if (y === prevY) {
        //     marginTopRef.current = marginTopRef.current - (fontSize * THRESHOLD);
        //     setMarginTop(marginTopRef.current);
        // }

        if ((prevY !== y && prevY !== 0 && prevY < y) || y === prevY) {
            console.log("decreased!")
            marginTopRef.current -= ((fontSize * THRESHOLD));
            setMarginTop(marginTopRef.current);
        }
        setPrevY(y);

    }, [y]);

    return (
        <div className={styles.container}>
            <p ref={pRef} className={`bg-gradient-to-r from-rose-400 to-fuchsia-500 text-transparent bg-clip-text ${styles.words}`} style={{ marginTop: `${marginTop}px` }}>
                {words.split('').map((char, index) => {
                    let color;
                    let bgColor;
                    if (index < charsTyped.length) {
                        color = char === charsTyped[index] ? '#a5b4fc' : 'white';
                        bgColor = char === charsTyped[index] ? 'transparent' : '#f87171';

                    }
                    return (
                        <span key={index} 
                              style={{ 
                                backgroundColor: bgColor,
                                color,
                                borderRadius: '10px', 
                                }}>
                            {char}
                            {index === charsTyped.length - 1 && <span ref={ref} className="cursor"></span>}
                        </span>
                    );
                })}
            </p>
        </div>
    );
};

export default WordDisplay;
