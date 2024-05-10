'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import handleKeyDown from '@/utils/utils'

function Typing() {
  const [words, setWords] = useState([]);
  const [keyPressed, setKeyPressed] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeyPressed(event.key);
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