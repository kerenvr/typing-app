import React, { useRef, useEffect, useState } from "react";
import styles from './wordDisplay.module.css';
import { useTheme } from '../../../themes/ThemeContext'; // Import the theme context

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
    const [x, setX] = useState<number>(0);
    const [array, setArray] = useState<number[]>([]);
    const prevRunRef = useRef<boolean>(false);  // Flag to track if it's the second time
    const prevResizeRef = useRef(false); // Flag to check if window is being resized

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

    useEffect(() => {
        // Function to handle resize event
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        // Add the resize event listener
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array means this effect runs only once, after the component mounts

    const colorsByTheme = {
        blue: {
            correct: '#555555',
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

    // todo: maybe have set margin tops? and set them accordingly. so instead of just having
    // different values that change, just have 2 set values: one it will always be on,
    // one for backspace, and one for ending?

    const increase = () => {
        marginTopRef.current += fontSize * THRESHOLD; // Increase marginTop
        setMarginTop(marginTopRef.current); // Update state with new marginTop
    };

    const decrease = () => {
        marginTopRef.current -= fontSize * THRESHOLD; // Decrease marginTop
        setMarginTop(marginTopRef.current); // Update state with new marginTop
    };

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setY(rect.y);
            setX(rect.x);
            console.log(`(${x}, ${y})`);
        }
    }, [charsTyped, windowHeight, windowWidth]);

    useEffect(() => {
        if (y === 0) { // get initial values, aka get current margin top and set it
            console.log("initial increase...");
            increase();
            return;
        }

        if (prevResizeRef.current) {
            prevResizeRef.current = false; // Reset the resize flag after resize
            return; // Skip logic if window is being resized
        }

        // Your logic to handle prevY change, as long as it's not during resize
        if (prevY !== y && prevY !== 0 && prevY < y) {
            console.log(prevY, y);
            if (prevRunRef.current) {
                console.log("Decreasing...");
                decrease(); // Decrease marginTop function (defined elsewhere)
            } else {
                console.log("First run, skipping decrease...");
            }

            prevRunRef.current = true; // Set flag to indicate second run
        }

        if (array.length < 3) { // should only iterate through two y-values only
            array.push(y);
            array.push(y + fontSize * THRESHOLD); // for fontsize of 32, value is 48, calculates how much to increase margin by. changes by fontsize
            array.push(y + fontSize * (2 * THRESHOLD)); // for fontsize of 32, value is 48, calculates how much to increase margin by. changes by fontsize
        }

        if (array.length === 3 && array.includes(y)) { // if y-value is the only two we are working with, then it's ok, else, we increase (move back up), because they made a mistake on the line that already disappeared
            setPrevY(y);
        } else {
            console.log("increasing...");
            increase(); // go back up
        }
        console.log(array);

    }, [y]);

    const hasMounted = useRef(false);

    useEffect(() => {
        // Skip effect on first render (mount)
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }

        // Run this logic only when windowHeight or windowWidth change
        console.log("window has changed... updating array now.");
        array.splice(0, 3); // Remove the first 3 elements
        array.push(y);
        array.push(y + fontSize * THRESHOLD);
        array.push(y + fontSize * (2 * THRESHOLD));
        console.log(array);

    }, [windowHeight, windowWidth]);  // Only include windowHeight and windowWidth in the dependency array

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
                            {(index === 0 && charsTyped === "" || index === charsTyped.length) && !cursorStopped && (
                                <span ref={ref} className="cursor"></span>
                            )}
                            {char}
                        </span>
                    );
                })}
            </p>
        </div>
    );
};

export default WordDisplay;
