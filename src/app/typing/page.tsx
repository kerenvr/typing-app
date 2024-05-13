'use client'
import React from 'react'
import { useEffect, useState } from 'react'

function Typing() {
  const [words, setWords] = useState([]);
  const [keyPressed, setKeyPressed] = useState('');
  const [wordArr, setWordArr] = useState<string[]>([]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1) { //only a letter or punctuation 
        setKeyPressed(prevKeyPressed => prevKeyPressed + e.key); //append all letters typed
      } else if (e.key === 'Backspace') { //delete
        setKeyPressed(prevKeyPressed => prevKeyPressed.slice(0, -1));
      }
    }

    window.addEventListener('keydown', handleKeyDown); //keydown listener on window
    
    const fetchWords = async () => {
      const response = await fetch ('/api/words');
      const data = await response.json();

      let tempArray = [];
      for (const wordObj of data) { //there are 20 objects, it will iterate through each one and access the word only
        const currWord = wordObj.words; //access the word
        tempArray.push(currWord); // push onto temporary array
      }
      setWordArr(tempArray); //set the wordArr to the temporary array

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
         {words.map((wordObj, index) => (
          <p key={index}>{wordObj.words}</p>
         ))}
         
      </div>
    </>
  )
}

export default Typing