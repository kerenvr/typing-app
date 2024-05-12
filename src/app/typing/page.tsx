'use client'
import React from 'react'
import { useEffect, useState } from 'react'

function Typing() {
  const [words, setWords] = useState([]);
  const [keyPressed, setKeyPressed] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        setKeyPressed(prevKeyPressed => prevKeyPressed + e.key);
      } else if (e.key === 'Backspace') {
        setKeyPressed(prevKeyPressed => prevKeyPressed.slice(0, -1));
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    
    const fetchWords = async () => {
      const response = await fetch ('/api/words');
      const data = await response.json();
      setWords(data);
    }
    fetchWords();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
}, []);

  return (
    <>
      <div>Typing</div>
      <div>
         <p>Key pressed: {keyPressed}</p>
      </div>
    </>
  )
}

export default Typing