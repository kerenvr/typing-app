'use client'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { fetchWords } from '@/utils/fetchWords';
import Link from 'next/link';
import Loading from './loading';
import { useTimer } from '@/hooks/useTimer';
import { useFetchWords } from '@/hooks/useFetchWords';
import WordDisplay from '@/components/wordDisplay/wordDisplay';

function Typing() {
  //words
  const [correctWordsTyped, setCorrectWordsTyped] = useState('');
  const [wordsTyped, setWordsTyped] = useState<string>('');
  const [index, setIndex] = useState(0);

  //timer
  const [isRunning, setIsRunning] = useState(false);

  const updateWordsAndIndex = (key: string, isBackspace: boolean = false) => {
    setWordsTyped((prevWordsTyped: string) => isBackspace ? prevWordsTyped.slice(0, -1) : prevWordsTyped + key);
    setIndex(prevIndex => isBackspace ? Math.max(prevIndex - 1, 0) : prevIndex + 1);
  }

const seconds = useTimer(isRunning);
const { isLoading, words } = useFetchWords();
const wpm = seconds !== 0 ? Math.round((correctWordsTyped.length / 5) / (seconds / 60)) : 0;

//event listeners 
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    setIsRunning(true);

    if (e.key === 'Backspace') { //delete 
      updateWordsAndIndex('', true);

    } else if (e.key.length === 1) { //is letter or punctuation
      updateWordsAndIndex(e.key)

      if (e.key === words[index]) { //correct letter typed
        setCorrectWordsTyped(prevCorrectWordsTyped => prevCorrectWordsTyped + 1);
      }
    }

    if (index === words.length - 1) { //stop timer when all words are typed
      setIsRunning(false);
    }
  }

  window.addEventListener('keydown', handleKeyDown); //keydown listener on window

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  }
})

return (
  <>
    {isLoading ? <Loading /> : (
      <>
        <div> {seconds} {wpm}</div>
        <WordDisplay words={words} wordsTyped={wordsTyped} />
        <Link href="/typing" onClick={() => window.location.reload()}>New Test</Link>
      </>
    )}
  </>
)
}


export default Typing