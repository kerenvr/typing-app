import React from 'react';
import styles from "./change-timer.module.css";

interface TimeLimitSelectorProps {
    setTimerAmount: (seconds: number) => void;
    timerAmount: number;
}

const TimeLimitSelector: React.FC<TimeLimitSelectorProps> = ({ setTimerAmount, timerAmount }) => {
    // Function to handle timer amount change
    const handleTimerAmountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const seconds = Number(event.target.value);
        setTimerAmount(seconds);
    };

    return (
        <div className={styles.container}>
            <div className={styles.changetimerAmount}>
                <h2>Timer</h2>

                <select value={timerAmount} onChange={handleTimerAmountChange} className={styles.dropdown}>
                    <option value="" disabled>Select Timer</option>
                    {[10, 30, 60, 90, 120].map((seconds) => (
                        <option key={seconds} value={seconds}>
                            {seconds}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TimeLimitSelector;
