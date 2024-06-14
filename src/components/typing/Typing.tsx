"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import Loading from '@/components/loading';
import WordDisplay from '@/components/wordDisplay/wordDisplay';
import { useTimer } from '@/hooks/useTimer';
import styles from './typing.module.css';

interface Word {
  words: string;
}

const Typing = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWordIndex] = useState<string>('');
  const [key, setKey] = useState<string>('');

  // Fetch words on component mount
  useEffect(() => {
    const fetchWords = async () => {
      const res = await fetch('http://localhost:3000/api/words');
      const words = await res.json();
      setWords(words);

      if (words.length > 0) {
        setCurrentWordIndex(words[0].word);
      }
      
    }
    fetchWords();
  }, []);

  // Event handler for keyboard input
  const handleKeyDown = (e: KeyboardEvent) => {
    const { key } = e;
    setKey(key)

    console.log(key);

  }
    
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
            {words.map((item, index) => (
              <div key={index} className={styles.word}>
                {item.words.split('').map((letter, index) => (
                  <div className={styles.letter} key={index}>{letter}</div>
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
