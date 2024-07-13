"use client";

import React, { useEffect, useState } from 'react';
import WordDisplay from '@/components/wordDisplay/wordDisplay';
import styles from './typing.module.css';

const Typing = () => {
  // State for word lists and selected words
  const [words, setWords] = useState<string>('');
  const [correctCharsTyped, setCorrectCharsTyped] = useState<string>('');
  const [charsTyped, setCharsTyped] = useState<string>('');
  const [index, setIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [moveOn, setMoveOn] = useState<boolean>(true);
  const [wpm, setWPM] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  // Define the word lists
  const wordsArray = ['hello', 'world', 'this', 'is', 'a', 'test', 'of', 'the', 'typing', 'speed', 'app'];
  const wordsArrayFlowers = [
    'rose', 'dandelion', 'tulip', 'lily', 'sunflower', 'orchid', 'daffodil', 'lilac', 'peony', 'hibiscus',
    'jasmine', 'chrysanthemum', 'violet', 'poppy', 'iris', 'marigold', 'lavender', 'camellia', 'magnolia', 'zinnia',
    'geranium', 'carnation', 'hydrangea', 'anemone', 'gardenia', 'begonia', 'pansy', 'snapdragon', 'freesia', 
    'lily-of-the-valley', 'foxglove', 'salvia', 'cosmos', 'bleeding heart', 'gladiolus', 'calendula', 'sweet pea', 
    'clematis', 'hellebore', 'calla lily', 'ranunculus', 'amaryllis', 'dahlia'
  ];
  const shakespeareSonnet109 = [
    "O!", "never", "say", "that", "I", "was", "false", "of", "heart,", "Though", "absence", "seemed", "my", "flame",
    "to", "qualify.", "As", "easy", "might", "I", "from", "myself", "depart", "As", "from", "my", "soul,", "which",
    "in", "thy", "breast", "doth", "lie:", "That", "is", "my", "home", "of", "love;", "if", "I", "have", "ranged,", 
    "Like", "him", "that", "travels,", "I", "return", "again,", "Just", "to", "the", "time,", "not", "with", "the", 
    "time", "exchanged,", "So", "that", "myself", "bring", "water", "for", "my", "stain.", "Never", "believe,", 
    "though", "in", "my", "nature", "reigned", "All", "frailties", "that", "besiege", "all", "kinds", "of", "blood,", 
    "That", "it", "could", "so", "preposterously", "be", "stained,", "To", "leave", "for", "nothing", "all", "thy", 
    "sum", "of", "good;", "For", "nothing", "this", "wide", "universe", "I", "call,", "Save", "thou,", "my", "rose;", 
    "in", "it", "thou", "art", "my", "all."
  ];

  const shakespeareSonnet15 = [
    "When", "I", "consider", "everything", "that", "grows",
    "Holds", "in", "perfection", "but", "a", "little", "moment,",
    "That", "this", "huge", "stage", "presenteth", "nought", "but", "shows",
    "Whereon", "the", "stars", "in", "secret", "influence", "comment;",
    "When", "I", "perceive", "that", "men", "as", "plants", "increase,",
    "Cheered", "and", "check'd", "even", "by", "the", "selfsame", "sky,",
    "Vaunt", "in", "their", "youthful", "sap,", "at", "height", "decrease,",
    "And", "wear", "their", "brave", "state", "out", "of", "memory;",
    "Then", "the", "conceit", "of", "this", "inconstant", "stay",
    "Sets", "you", "most", "rich", "in", "youth", "before", "my", "sight,",
    "Where", "wasteful", "Time", "debateth", "with", "Decay",
    "To", "change", "your", "day", "of", "youth", "to", "sullied", "night;",
    "And", "all", "in", "war", "with", "Time", "for", "love", "of", "you,",
    "As", "he", "takes", "from", "you,", "I", "engraft", "you", "new."
  ];
  
  const commonWordsArray = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
    "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
    "this", "but", "by", "from", "they", "we", "say", "her", "she", "or",
    "an", "will", "my", "one", "all", "would", "there", "their", "what", "so",
    "up", "out", "if", "about", "who", "get", "which", "go", "me", "make",
    "can", "like", "time", "no", "just", "him", "know", "take", "people", "into",
    "year", "your", "good", "some", "could", "them", "see", "other", "than", "then",
    "now", "look", "only", "come", "its", "over", "think", "also", "back", "after",
    "use", "two", "how", "our", "work", "first", "well", "way", "even", "new",
    "want", "because", "any", "these", "give", "day", "most", "us", "here", "such"
  ];
  

  // State to manage the current word list
  const [currentWordsArray, setCurrentWordsArray] = useState(wordsArray);

  // Set words when currentWordsArray changes
  useEffect(() => {
    setWords(currentWordsArray.join(' '));
  }, [currentWordsArray]);

  // Event handler for keyboard input
  const handleKeyDown = (e: KeyboardEvent) => {
    setIsRunning(true);
    const { key } = e;

    if (e.key === ' ') {
      e.preventDefault();
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
        updateWordsAndIndex(e.key)
      }
      setMoveOn(false);
      return;
    }
    
    updateWordsAndIndex(e.key)
    setCorrectCharsTyped(prevCorrectCharsTyped => prevCorrectCharsTyped + 1);
    setMoveOn(true);

    if (index === words.length - 1) {
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

  // Calculate words per minute
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  useEffect(() => {
    const wPM = seconds !== 0 ? Math.round((charsTyped.length / 5) / (seconds / 60)) : 0;
    setWPM(wPM);
  }, [charsTyped.length, seconds]);

  // Button click handler for changing word list
  const handleWordListChange = (list: string[]) => {
    setCurrentWordsArray(list);
    setCharsTyped(''); // Reset typed characters
    setIndex(0); // Reset index
    setIsRunning(false); // Stop typing
    setSeconds(0); // Reset timer
    setWPM(0); // Reset WPM
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2 className="text-indigo-500">Word Lists</h2>
        <button onClick={() => handleWordListChange(wordsArray)} className={styles.sidebarButton}>
          Default 
          <p className="font-thin text-xs">11 words</p>
        </button>
        <button onClick={() => handleWordListChange(wordsArrayFlowers)} className={styles.sidebarButton}>
          Flowers
          <p className="font-thin text-xs">44 words</p>
        </button>
        <button onClick={() => handleWordListChange(commonWordsArray)} className={styles.sidebarButton}>
          Common Words
          <p className="font-thin text-xs">77 words</p>
        </button>
        <button onClick={() => handleWordListChange(shakespeareSonnet109)} className={styles.sidebarButton}>
          Shakespeare Sonnet 109 
          <p className="font-thin text-xs">86 words</p>
        </button>
        <button onClick={() => handleWordListChange(shakespeareSonnet15)} className={styles.sidebarButton}>
          Shakespeare Sonnet 15
          <p className="font-thin text-xs">114 words</p>
        </button>


      </div>
      <div className={styles.mainContent}>
        <div className="flex justify-between w-full">
          <div className={styles.wpm}>[ {seconds} ]</div>
          <div className={styles.wpm}>[ {wpm} ]</div>
        </div>
        <div className={styles.wordContainer}>
          <WordDisplay words={words} charsTyped={charsTyped} />
        </div>
      </div>
    </div>
  );
}

export default Typing;
