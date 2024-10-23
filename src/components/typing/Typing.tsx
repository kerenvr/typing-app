"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import Loading from '@/components/loading';
import WordDisplay from '@/components/wordDisplay/wordDisplay';
import { useTimer } from '@/hooks/useTimer';
import styles from './typing.module.css';
import DifficultySelector from '../difficulty-setting/index';
import { cn } from '@/lib/utils';

const Typing = () => {
  const [words, setWords] = useState<string>('');
  const [correctCharsTyped, setCorrectCharsTyped] = useState<string>('');
  const [charsTyped, setCharsTyped] = useState<string>('');
  const [index, setIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const router = useRouter();
  const [moveOn, setMoveOn] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState<string>('1');
  // Fetch words on component mount
  useEffect(() => {
    const fetchWords = async () => {
      const res = await fetch(`/api/words?difficulty=${difficulty}`); // Fetch words with difficulty
      const words = await res.json();
      console.log('Fetched Words:', words);
      const allWords = words.map((word: { word: string }) => word.word).join(' '); // Adjust according to your model
      setWords(allWords);
    };
    fetchWords();
  }, [difficulty]);

  // Event handler for keyboard input
  const handleKeyDown = (e: KeyboardEvent) => {
    setIsRunning(true);
    const { key } = e;

    if (key === 'Backspace') {
      updateWordsAndIndex('', true);
      return;
    }
    
    if (key.length !== 1) {
      return;
    }
    
    if (key !== words[index]) {
      if (moveOn) {
        updateWordsAndIndex(e.key)
      }
      setMoveOn(false);
      return;
    }
    
    updateWordsAndIndex(e.key)
    setCorrectCharsTyped(prevCorrectCharsTyped => prevCorrectCharsTyped + 1);
    setMoveOn(true);

    if (index === words.length - 1) {
      setIsRunning(false);
    }
  }

  // Update words typed and index
  const updateWordsAndIndex = (key: string, isBackspace: boolean = false) => {
    setCharsTyped((prevCharsTyped: string) => isBackspace ? prevCharsTyped.slice(0, -1) : prevCharsTyped + key);
    setIndex(prevIndex => isBackspace ? Math.max(prevIndex - 1, 0) : prevIndex + 1);
  }

  // Event listener setup and cleanup
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  });

  // Calculate words per minute
  const seconds = useTimer(isRunning);
  const wpm = seconds !== 0 ? Math.round((charsTyped.length / 5) / (seconds / 60)) : 0;

  return (
    <>
    <div className={styles.dashboard}>
      <div className={styles.wpmtime}>
          <div className={styles.wpm}> time: { seconds } </div>
          <div className={styles.wpm}>wpm: { wpm } </div>
        </div>  
        <DifficultySelector setDifficulty={setDifficulty} difficulty={difficulty} />  
      </div>
    <div className={styles.container}>
      <div className={` ${styles.wordContainer}`}>
        <WordDisplay words={words} charsTyped={charsTyped} wpm={wpm}/>
      </div>
    </div>
    </>
  );
}

export default Typing;
