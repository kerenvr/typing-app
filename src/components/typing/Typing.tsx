"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import Loading from '@/components/loading';
import WordDisplay from '@/components/wordDisplay/wordDisplay';
import { useTimer } from '@/hooks/useTimer';
import styles from './typing.module.css';
import { useSession } from 'next-auth/react';
import { saveWPM } from '../../../actions/save-wpm';

const Typing = () => {
  const { data: session } = useSession()
  const userid = session?.user?.id;

  const [words, setWords] = useState<string>('');
  const [correctCharsTyped, setCorrectCharsTyped] = useState<string>('');
  const [charsTyped, setCharsTyped] = useState<string>('');
  const [index, setIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const router = useRouter();
  const [moveOn, setMoveOn] = useState<boolean>(true);
  const [backSpace, setBackSpace] = useState<boolean>(true);
  const [wpm, setWpm] = useState<number>(0);
  const [isFinished, setIsFinsihed] = useState<boolean>(false);

  // async function postWPM() {
  //   const response = await fetch('/api/wpm', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ wpm, userId: userid }),
  //   });
  
  //   if (!response.ok) {
  //     console.error('Failed to save typing speed');
  //   } else {
  //     const data = await response.json();
  //     console.log('Typing speed saved:', data);
  //   }
  // }

  // Fetch words on component mount
  async function fetchWords() {
    const res = await fetch('http://localhost:3000/api/words');
    const words = await res.json();
    console.log(words)
    const allWords = words.map((words: { word: any; }) => words.word).join(' ');
    setWords(allWords);
  }
  useEffect(() => {
    fetchWords();
  }, [])

  // Event handler for keyboard input
  const handleKeyDown = (e: KeyboardEvent) => {
    const wpm = seconds !== 0 ? Math.round((charsTyped.length / 5) / (seconds / 60)) : 0;
    setWpm(wpm);

    setIsRunning(true);
    const { key } = e;

    if (e.key === ' ') {
      e.preventDefault();
    }

    if (key === 'Backspace' && backSpace) {
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
      setIsFinsihed(true);
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

  useEffect(() => {
    if (isFinished) {
      saveWPM({wpm: wpm, userId: userid})
    }
  })


  // Calculate words per minute
  const seconds = useTimer(isRunning);

  return (
    <>
    <div className={styles.container}>
    <div>{wpm}</div> 
      <div className="flex justify-between w-full">
      </div>
      {isFinished && 
        <div className="flex justify-center">
          <button onClick={() => window.location.reload()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play Again</button>
        </div>
      
      }
      <div className={` ${styles.wordContainer}`}>
        <WordDisplay words={words} charsTyped={charsTyped}/>
      </div>

    </div>
    </>
  );
}

export default Typing;
