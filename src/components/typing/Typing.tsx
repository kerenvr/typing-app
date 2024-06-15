"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import Loading from '@/components/loading';
import WordDisplay from '@/components/wordDisplay/wordDisplay';
import { useTimer } from '@/hooks/useTimer';
import styles from './typing.module.css';

interface Word {
  word: string;
}

const Typing = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [splitWord, setSplitWord] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>();

  // Fetch words on component mount
  useEffect(() => {
    const fetchWords = async () => {
      const res = await fetch('http://localhost:3000/api/words');
      const dbWords = await res.json();
      setWords(dbWords);

      setCurrentWord(dbWords[currentWordIndex].word + " ") //starts at first word
    }
    fetchWords();
  }, []);

  useEffect(() => {
    const split = currentWord.split('') 
    setSplitWord(split);
  }, [currentWord])


  // Event handler for keyboard input
  const handleKeyDown = (e: KeyboardEvent) => {
    const { key } = e;
    console.log(key, splitWord[index])

    if (key === ' ') {
      setCurrentWordIndex(prevCurrentWordIndex => prevCurrentWordIndex + 1);
      setIndex(-1)
    }

    if (key.length !== 1) return;

    if (key === splitWord[index]) {
      console.log("true!")
      setIsCorrect(true);
      setIndex(prevIndex => prevIndex + 1)

    } else {
      console.log("false!")
      setIsCorrect(false)
    }

  }

  useEffect(() => {
    if (words[currentWordIndex]) {
      setCurrentWord(words[currentWordIndex].word + " ");
    }
  }, [currentWordIndex, words])

  // Event listener setup and cleanup
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  });

  // Calculate words per minute
  // const seconds = useTimer(isRunning);
  // const wpm = seconds !== 0 ? Math.round((charsTyped.length / 5) / (seconds / 60)) : 0;

  return (
    <>
    <div>{currentWord}</div>
      <div className={styles.container}>
        <div className={` ${styles.wordContainer}`}>
            {words.map((wordObject, wordIndex) => (
              <div key={wordIndex} 
                className={`${styles.word} `}
              >
                {wordObject.word.split('').map((letter, letterIndex) => (
                  <div className={`${styles.letter} ${wordIndex === currentWordIndex ? (letterIndex === index ? styles.activeLetter : styles.activeWord) : ''}`}
                                  key={letterIndex}>
                    {letter}
                  </div>
                ))}
                <div>&nbsp;</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Typing;
