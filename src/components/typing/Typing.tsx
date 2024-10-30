"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import WordDisplay from '@/components/wordDisplay/wordDisplay';
import { useTimer } from '@/hooks/useTimer';
import { useStopwatch } from '@/hooks/useStopwatch';
import styles from './typing.module.css';
import DifficultySelector from '../difficulty-setting/index';
import ScoreScreen from '../score-screen/score-screen';
import TimerLimitSelector from '../change-timer/change-timer';
import { useUser } from "@clerk/nextjs";

const Typing = () => {
  const [words, setWords] = useState<string>(''); // words to render
  const [charsTyped, setCharsTyped] = useState<string>(''); // to use in WPM formula
  const [index, setIndex] = useState(0); // curr index word
  const [isRunning, setIsRunning] = useState(false); // timer is running
  const [moveOn, setMoveOn] = useState<boolean>(true); // if wrong, cant move on until right
  const [difficulty, setDifficulty] = useState<number>(1); // set difficulty
  const [wordCount, setWordCount] = useState<number>(200); // words to render from db
  const [cursorStopped, setCursorStopped] = useState<boolean>(false); // remove cursor when done
  const [isFinished, setIsFinished] = useState<boolean>(false); // if is finished, reset (curr char typed matches length of all chars)
  const [totalWordsTyped, setTotalWordsTyped] = useState<number>(0); // all the words they have typed
  const [timerAmount, setTimerAmount] = useState<number>(30); // set timer option 10, 30, 60, 90, 120
  const [resetTimer, setResetTimer] = useState(false); // reset timer when finished
  const [loading, setLoading] = useState(true); // fetching from db
  const [hasSaved, setHasSaved] = useState(false); // has saved to db


  const { isLoaded, user } = useUser();
  

  //POST WPM
  const handleSaveWpm = async () => {
		if (!user?.username|| !user.id) return; // not logged in
		const request = await fetch("/api/save-wpm", { //save-wpm to save to db
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: user?.id,
				wpm: wpm,
				difficulty: difficulty,
			  time: timerAmount
			}),
		});
		const response = await request.json();
		alert(response.message);
	};


  const SkeletonLoader = () => (
    <div className={styles.skeleton}>
      loading...  
    </div>
  );


  const shuffleArray = (array: any[]) => { // shuffle words from db so it's different every time
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };


  // GET WORDS
  const fetchWords = async () => {
    setLoading(true); 
    const res = await fetch(`/api/words?difficulty=${difficulty}&limit=${wordCount + 20}`);
    const wordsData = await res.json();
    const shuffledWords = shuffleArray(wordsData.map((word: { word: string }) => word.word));
    setWords(shuffledWords.join(' '));
    setLoading(false);
  };

  useEffect(() => { //GET request
    fetchWords();
  }, [difficulty, wordCount]);

  const handleKeyDown = (e: KeyboardEvent) => { 
    if (isFinished) return;
    setIsRunning(true); // timer starts when user types something
    const { key } = e; // get the key only
 
    if (key === 'Backspace') {
      updateWordsAndIndex('', true);
      return;
    }
    
    if (key.length !== 1) { // if it is 'Shift' etc
      return;
    }
    
    if (key !== words[index]) { // if the key is incorrect
      if (moveOn) {
        updateWordsAndIndex(e.key);
      }
      setMoveOn(false);
      return;
    }
    
    updateWordsAndIndex(e.key);
    setMoveOn(true);
  };

  const updateWordsAndIndex = (key: string, isBackspace: boolean = false) => {
    setCharsTyped((prev) => isBackspace ? prev.slice(0, -1) : prev + key);
    setIndex((prev) => isBackspace ? Math.max(prev - 1, 0) : prev + 1);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  let seconds = useStopwatch(isRunning, resetTimer);
  let countdown = useTimer(isRunning, resetTimer, timerAmount);
  const wpm = seconds !== 0 ? Math.round((charsTyped.length / 5) / (seconds / 60)) : 0;

  useEffect(() => {
    if (countdown === 0 && isRunning && !hasSaved) {
      handleSaveWpm()
      setHasSaved(true);
      setTotalWordsTyped(charsTyped.split(' ').length);
      setIsRunning(false);
      setCursorStopped(true);
      setIsFinished(true);
    }
  }, [countdown, timerAmount, charsTyped, isRunning]);

  const resetGame = () => {
    setHasSaved(false);
    setCharsTyped('');
    setIndex(0);
    setIsRunning(false);
    setCursorStopped(false);
    setIsFinished(false);
    setTotalWordsTyped(0);
    fetchWords();
    setResetTimer(true);
    setTimeout(() => setResetTimer(false), 0);
  };

  return (
    <>
      <div className={styles.dashboard}>
        {/* <DifficultySelector setDifficulty={setDifficulty} difficulty={difficulty} /> */}
        {/* <TimerLimitSelector setTimerAmount={setTimerAmount} timerAmount={timerAmount} /> */}
      </div>
  
      {isFinished ? (
        <div className={styles.scorecontainer}>
          <ScoreScreen 
            wpm={wpm}
            seconds={seconds}
            totalWords={totalWordsTyped}
          />
          <button className={styles.restartbtn} onClick={resetGame}>
            Restart
        </button>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.wpmWords}>
            <div className={styles.wpmtime}>
              <div className={styles.wpm}>{countdown}</div>
              <div className={styles.wpm}>{wpm}</div>
            </div>
            <div className={styles.wordContainer}>
              {loading ? (
                <SkeletonLoader />
              ) : (
                <WordDisplay 
                  words={words} 
                  charsTyped={charsTyped} 
                  wpm={wpm} 
                  cursorStopped={cursorStopped} 
                />
              )}
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.restartbtn} onClick={resetGame}>
              Restart
            </button>
            <div className={styles.dtbtn}>
            <DifficultySelector setDifficulty={setDifficulty} difficulty={difficulty} />
            <TimerLimitSelector setTimerAmount={setTimerAmount} timerAmount={timerAmount} />

              {/* <button className={styles.difficultybtn} onClick={resetGame}>
                difficulty
              </button>
              <button className={styles.timerbtn} onClick={resetGame}>
                timer
              </button> */}
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Typing;
