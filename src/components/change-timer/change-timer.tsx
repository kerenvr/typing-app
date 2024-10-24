import React from 'react';
import styles from "./change-timer.module.css";

interface TimeLimitSelectorProps {
    setTimerAmount: (seconds: number) => void;
    timerAmount: number;
}

const TimeLimitSelector: React.FC<TimeLimitSelectorProps> = ({ setTimerAmount, timerAmount }) => {
    // Function to handle button clicks
    const handleTimerAmountChange = (seconds: number) => {
        setTimerAmount(seconds);
    };

    return (
        <div className={styles.container}>
            <h2>Timer: {timerAmount} sec</h2>

            <div className={styles.changetimerAmount}>
                <h2>Change Timer: </h2>

                <div className={styles.btnContainer}>
                    {[10, 30, 60, 90, 120].map((seconds) => (
                        <button className={styles.btn} key={seconds} onClick={() => handleTimerAmountChange(seconds)}>
                            {seconds}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimeLimitSelector;
