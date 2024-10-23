"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import WordDisplay from '@/components/wordDisplay/wordDisplay';
import { useTimer } from '@/hooks/useTimer';
import styles from './typing.module.css';
import DifficultySelector from '../difficulty-setting/index';
import ScoreScreen from '../score-screen/score-screen';
import TimerLimitSelector from '../change-timer/change-timer';

const Typing = () => {
  const [words, setWords] = useState<string>('');
  const [charsTyped, setCharsTyped] = useState<string>('');
  const [index, setIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [moveOn, setMoveOn] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState<string>('1');
  const [wordCount, setWordCount] = useState<number>(200);
  const [cursorStopped, setCursorStopped] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [totalWordsTyped, setTotalWordsTyped] = useState<number>(0);
  const [timerAmount, setTimerAmount] = useState<number>(30);
  const [resetTimer, setResetTimer] = useState(false);


  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  const fetchWords = async () => {
    const res = await fetch(`/api/words?difficulty=${difficulty}&limit=${wordCount + 20}`);
    const wordsData = await res.json();
    const shuffledWords = shuffleArray(wordsData.map((word: { word: string }) => word.word));
    setWords(shuffledWords.join(' '));
  };

  useEffect(() => {
    fetchWords();
  }, [difficulty, wordCount]);

  const handleKeyDown = (e: KeyboardEvent) => {
    setIsRunning(true);
    const { key } = e;

    if (seconds === timerAmount) {
      setTotalWordsTyped(charsTyped.split(' ').length);
      setIsRunning(false);
      setCursorStopped(true);
      setIsFinished(true);
      return;
    }

    if (key === 'Backspace') {
      updateWordsAndIndex('', true);
      return;
    }
    
    if (key.length !== 1) {
      return;
    }
    
    if (key !== words[index]) {
      if (moveOn) {
        updateWordsAndIndex(e.key);
      }
      setMoveOn(false);
      return;
    }
    
    updateWordsAndIndex(e.key);
    setMoveOn(true);
  };

  const updateWordsAndIndex = (key: string, isBackspace: boolean = false) => {
    setCharsTyped((prev) => isBackspace ? prev.slice(0, -1) : prev + key);
    setIndex((prev) => isBackspace ? Math.max(prev - 1, 0) : prev + 1);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const seconds = useTimer(isRunning, resetTimer);
  const wpm = seconds !== 0 ? Math.round((charsTyped.length / 5) / (seconds / 60)) : 0;

  const resetGame = () => {
    setCharsTyped('');
    setIndex(0);
    setIsRunning(false);
    setCursorStopped(false);
    setIsFinished(false);
    setTotalWordsTyped(0);
    fetchWords();
    setResetTimer(true);
    setTimeout(() => setResetTimer(false), 0);
  };

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.wpmtime}>
          <div className={styles.wpm}>time: {seconds}</div>
          <div className={styles.wpm}>wpm: {wpm}</div>
        </div>
        <DifficultySelector setDifficulty={setDifficulty} difficulty={difficulty} />
        <TimerLimitSelector setTimerAmount={setTimerAmount} timerAmount={timerAmount} />
      </div>
      
      {isFinished ? (
        <div className={styles.scorecontainer}>
          <ScoreScreen 
            wpm={wpm}
            seconds={seconds}
            totalWords={totalWordsTyped}
          />
          <button className={styles.restartbtn} onClick={resetGame}>Restart</button>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.wordContainer}>
            <WordDisplay 
              words={words} 
              charsTyped={charsTyped} 
              wpm={wpm} 
              cursorStopped={cursorStopped} 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Typing;
