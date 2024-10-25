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
import ProgressBar from '../progress-bar/progress-bar';

const Typing = () => {
  const [words, setWords] = useState<string>('');
  const [charsTyped, setCharsTyped] = useState<string>('');
  const [index, setIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [moveOn, setMoveOn] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState<string>('1');
  const [wordCount, setWordCount] = useState<number>(200);
  const [cursorStopped, setCursorStopped] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [totalWordsTyped, setTotalWordsTyped] = useState<number>(0);
  const [timerAmount, setTimerAmount] = useState<number>(30);
  const [resetTimer, setResetTimer] = useState(false);
  const [loading, setLoading] = useState(true);

  const SkeletonLoader = () => (
    <div className={styles.skeleton}>
      loading...  
    </div>
  );


  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  const fetchWords = async () => {
    setLoading(true); 
    const res = await fetch(`/api/words?difficulty=${difficulty}&limit=${wordCount + 20}`);
    const wordsData = await res.json();
    const shuffledWords = shuffleArray(wordsData.map((word: { word: string }) => word.word));
    setWords(shuffledWords.join(' '));
    setLoading(false);
  };

  useEffect(() => {
    fetchWords();
  }, [difficulty, wordCount]);

  const handleKeyDown = (e: KeyboardEvent) => {
    setIsRunning(true);
    const { key } = e;

    if (key === 'Backspace') {
      updateWordsAndIndex('', true);
      return;
    }
    
    if (key.length !== 1) {
      return;
    }
    
    if (key !== words[index]) {
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
  const elapsedTime = timerAmount - countdown; // Calculate elapsed time
  const progress = ((elapsedTime / timerAmount) * 100).toFixed(0); // Calculate progress

  useEffect(() => {
    if (countdown === 0 && isRunning) {
      console.log(charsTyped, charsTyped.split(' '), charsTyped.split(' ').length)
      setTotalWordsTyped(charsTyped.split(' ').length);
      setIsRunning(false);
      setCursorStopped(true);
      setIsFinished(true);
    }
  }, [countdown, timerAmount, charsTyped, isRunning]);

  const resetGame = () => {
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
        <DifficultySelector setDifficulty={setDifficulty} difficulty={difficulty} />
        <TimerLimitSelector setTimerAmount={setTimerAmount} timerAmount={timerAmount} />
      </div>
      <div className={styles.wpmtime}>
          <div className={styles.wpm}>{countdown}</div>
          <div className={styles.wpm}>{wpm}</div>
      </div>
  
      {isFinished ? (
        <div className={styles.scorecontainer}>
          <ScoreScreen 
            wpm={wpm}
            seconds={seconds}
            totalWords={totalWordsTyped}
          />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.wordContainer}>
            {loading ? (
              <SkeletonLoader />
            ) : (
              <div className={styles.displaycontainer}>
              <ProgressBar progress={progress} /> {/* Add the progress bar here */}
                <WordDisplay 
                  words={words} 
                  charsTyped={charsTyped} 
                  wpm={wpm} 
                  cursorStopped={cursorStopped} 
                />
              </div>
            )}
          </div>
        </div>
      )}
      <button className={styles.restartbtn} onClick={resetGame}>
        <svg viewBox="359.035925 222 483.964075 434" width="15" height="15" fill="#ffff">
          <path d="M379.035925 465.000001 L438 465.000001 C438 465.000001, 448 465.000001, 448 455.000001 L448 410.999735 C448 410.999735, 448 400.999735, 438 400.999735 L381.02037 400.999735 C381.02037 400.999735, 371.02037 400.999735, 371.02037 390.999735 L371.02037 316.999735 C371.02037 316.999735, 371.02037 306.999735, 381.02037 306.999735 L437 306.999735 C437 306.999735, 447 306.999735, 447 296.999735 L447 242 C447 242, 447 232, 457 232 L529 232 C529 232, 539 232, 539 242 L539 290.074103 C539 290.074103, 539 300.074103, 549 300.074103 L591.929586 300.074103 C591.929586 300.074103, 601.929586 300.074103, 601.929586 310.074103 L601.929586 348 C601.929586 348, 601.929586 358, 611.929586 358 L659 358 C659 358, 669 358, 669 348 L669 306 C669 306, 669 296, 679 296 L751 296 C751 296, 761 296, 761 306 L761 355 C761 355, 761 365, 771 365 L823 365 C823 365, 833 365, 833 375 L833 449 C833 449, 833 459, 823 459 L770 459 C770 459, 760 459, 760 469 L760 513 C760 513, 760 523, 750 523 L678 523 C678 523, 668 523, 668 513 L668 462 C668 462, 668 452, 658 452 L601 452 C601 452, 591 452, 591 442 L591 404.074103 C591 404.074103, 591 394.074103, 581 394.074103 L550 394.074103 C550 394.074103, 540 394.074103, 540 404.074103 L540 450 C540 450, 540 460, 550 460 L592 460 C592 460, 602 460, 602 470 L602 544 C602 544, 602 554, 592 554 L559 554 C559 554, 549 554, 549 564 L549 636 C549 636, 549 646, 539 646 L467 646 C467 646, 457 646, 457 636 L457 569.000001 C457 569.000001, 457 559.000001, 447 559.000001 L379.035925 559.000001 C379.035925 559.000001, 369.035925 559.000001, 369.035925 549.000001 L369.035925 475.000001 C369.035925 475.000001, 369.035925 465.000001, 379.035925 465.000001, M461.035925 485 L461.035925 542 C461.035925 542, 461.035925 552, 471.035925 552 L500 552 C500 552, 510 552, 510 542 L510 485 C510 485, 510 475, 500 475 L471.035925 475 C471.035925 475, 461.035925 475, 461.035925 485, M463.02037 336 L463.02037 371 C463.02037 371, 463.02037 381, 473.02037 381 L499.929586 381 C499.929586 381, 509.929586 381, 509.929586 371 L509.929586 336 C509.929586 336, 509.929586 326, 499.929586 326 L473.02037 326 C473.02037 326, 463.02037 326, 463.02037 336, M683 400 L683 419 C683 419, 683 429, 693 429 L731 429 C731 429, 741 429, 741 419 L741 400 C741 400, 741 390, 731 390 L693 390 C693 390, 683 390, 683 400"></path>
        </svg>
        <p>Restart</p>
      </button>
    </>
  );
};

export default Typing;
