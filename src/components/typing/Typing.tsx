"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import Loading from '@/components/loading';
import WordDisplay from '@/components/wordDisplay/wordDisplay';
import Flowers from '@/components/flowers/flowers'; // Import Flowers component
import { useTimer } from '@/hooks/useTimer';
import styles from './typing.module.css';

const Typing = () => {
  const [words, setWords] = useState<string>('');
  const [correctWordsTyped, setCorrectWordsTyped] = useState<string>('');
  const [wordsTyped, setWordsTyped] = useState<string>('');
  const [index, setIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [flowers, setFlowers] = useState<number>(0); // State to track the number of flowers
  const router = useRouter();

  // Fetch words on component mount
  useEffect(() => {
    const fetchWords = async () => {
      const res = await fetch('http://localhost:3000/api/words');
      const words = await res.json();
      const allWords = words.map((word: { words: any; }) => word.words).join(' ');
      setWords(allWords);
    }
    fetchWords();
  }, []);

  // Event handler for keyboard input
  const handleKeyDown = (e: KeyboardEvent) => {
    setIsRunning(true);
    const { key } = e;

    if (key === 'Backspace') {
      updateWordsAndIndex('', true);
    } else if (key.length === 1) {
      updateWordsAndIndex(e.key)

      if (key === words[index]) {
        setCorrectWordsTyped(prevCorrectWordsTyped => prevCorrectWordsTyped + 1);
        setFlowers(prevFlowers => prevFlowers + 1); // Grow flowers when a correct word is typed
      }
    }

    if (index === words.length - 1) {
      setIsRunning(false);
    }
  }

  // Update words typed and index
  const updateWordsAndIndex = (key: string, isBackspace: boolean = false) => {
    setWordsTyped((prevWordsTyped: string) => isBackspace ? prevWordsTyped.slice(0, -1) : prevWordsTyped + key);
    setIndex(prevIndex => isBackspace ? Math.max(prevIndex - 1, 0) : prevIndex + 1);
  }

  // Event listener setup and cleanup
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  });

  // Handle click event for the button
  const handleClick = () => {
    console.log("clicked")
    router.refresh();
  }

  // Calculate words per minute
  const seconds = useTimer(isRunning);
  const wpm = seconds !== 0 ? Math.round((correctWordsTyped.length / 5) / (seconds / 60)) : 0;

  return (
    <div className={styles.container}>
      <div className={styles.wordContainer}>
        <div className={styles.info}>{seconds} {wpm}</div>
        <WordDisplay words={words} wordsTyped={wordsTyped} />
      </div>
      {/* <button className={styles.button} onClick={handleClick}>New Test</button> */}
    </div>
  );
}

export default Typing;
