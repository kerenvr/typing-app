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
            marginTopRef.current = marginTopRef.current + (fontSize * THRESHOLD);
            setMarginTop(marginTopRef.current);
            return;
        }
        
        if (y === prevY) {
            marginTopRef.current = marginTopRef.current - (fontSize * THRESHOLD);
            setMarginTop(marginTopRef.current);
        }

        if (prevY !== y && prevY !== 0 && prevY < y) {
            marginTopRef.current = marginTopRef.current - (fontSize * THRESHOLD);
            setMarginTop(marginTopRef.current);
        }
        setPrevY(y);
    }, [y]);

    return (
        <div className={styles.container}>
            {words}
        </div>
    );
};

export default WordDisplay;
