'use client'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { fetchWords } from '@/utils/fetchWords';
import Link from 'next/link'

function Typing() {
  //initialize words, wordsTyped, current character, and current index
  const [correctWordsTyped, setCorrectWordsTyped] = useState('');
  const [wordsTyped, setwordsTyped] = useState('');
  const [words, setWords] = useState<string>('');
  const [seconds, setSeconds] = useState(0);
  const [index, setIndex] = useState(0);

  const timer = useRef<NodeJS.Timeout | null>(null);
  const accuracy = wordsTyped.length !== 0 ? Math.round((correctWordsTyped.length / wordsTyped.length) * 100) : 100;

  //timer
  if (timer.current === null && index > 0) {
    var start = Date.now();
    timer.current = setInterval(() => {
      var elapsedTime = Date.now() - start; // milliseconds elapsed since start
      setSeconds(Number((elapsedTime / 1000).toFixed(0))); // convert to number
    }, 1000)
  }
  //must change to where it takes errors as well // const wpm = seconds !== 0 ? Math.round((wordsTyped.length / 5) / (seconds / 60)) : 0;
  const wpm = seconds !== 0 ? Math.round((correctWordsTyped.length / 5) / (seconds / 60)) : 0;
if (index === words.length - 1) {
    if (timer.current !== null) {
        clearInterval(timer.current);
        timer.current = null;
    }
}


  //fetch words from database, joined the words array into a string, and set the words and current character initialized
  useEffect(() => {
    const getWords = async () => {
      const { tempArray } = await fetchWords();
      const joinedWords = tempArray.join(' ');
      setWords(joinedWords);
    };

    getWords();

}, []);

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Backspace':
          setwordsTyped(prevwordsTyped => prevwordsTyped.slice(0, -1));
          setIndex((prevIndex) => Math.max(prevIndex - 1, 0));

        break;
      default: 
        if (e.key.length === 1) { //only a letter or punctuation 
          setwordsTyped(prevwordsTyped => prevwordsTyped + e.key); //append all letters typed
          setIndex((prevIndex) => prevIndex + 1)
          if (e.key === words[index]) {
            setCorrectWordsTyped(prevCorrectWordsTyped => prevCorrectWordsTyped + 1)
          }
        break;
      }
    }
  }

  window.addEventListener('keydown', handleKeyDown); //keydown listener on window

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  }
})



  return (
    <>
      <div>Typing</div>
      <div>{seconds} {wpm}</div>
      <div className="p-10 text-3xl flex items-center justify-center">
         <p className="text-gray-400"> 
         
         {words.split('').map((char, index) => {
          let color;
          if (index < wordsTyped.length) {
            color = char === wordsTyped[index] ? 'black' : 'red';
          }

          return (
          <span 
            key={index} style={{ color: color}}>
            {char}
            {index === wordsTyped.length -1 && <span className="cursor"></span>}
          </span>);

         })}
          </p>
        </div>
        <Link href="/typing" onClick={() => window.location.reload()}>New Test</Link>
       
      </>
  )
}


export default Typing