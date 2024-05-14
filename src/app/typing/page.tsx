'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { fetchWords } from '@/utils/fetchWords';

function Typing() {
  const [keyPressed, setKeyPressed] = useState('');
  const [words, setWords] = useState<string>('');
  const [currChar, setCurrChar] = useState<string>('');
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState<string>('');

  const updateIndexandCurrChar = (change: number) => {
    setIndex(prevIndex => {
      const newIndex = prevIndex + change;
      setCurrChar(words[newIndex]);
      return newIndex
    });
  };

  useEffect(() => {
    const getWords = async () => {
      const { tempArray } = await fetchWords();
      const joinedWords = tempArray.join(' ');
      setWords(joinedWords);
      setCurrChar(joinedWords[0]);
    };

    getWords();

}, []);

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key.length === 1) { //only a letter or punctuation 
      setKeyPressed(prevKeyPressed => prevKeyPressed + e.key); //append all letters typed
      if (e.key === currChar) {
        updateIndexandCurrChar(1);
        setColor('green');
      } else {
        setColor('red');
      }
    } else if (e.key === 'Backspace') { //delete
      setKeyPressed(prevKeyPressed => prevKeyPressed.slice(0, -1));
      //updateIndexandCurrChar(-1);
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
      <div>
         <p style={{color: color}}>Key pressed: {keyPressed}</p>
         <p>Words: {words}</p>
         <p>curr: {currChar}</p>
      </div>
    </>
  )
}

export default Typing