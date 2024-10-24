import { useState, useEffect } from "react";

export const useTimer = (isRunning: boolean, reset: boolean, timerAmount: number): number => {
    const [seconds, setSeconds] = useState(timerAmount); // Initialize with timerAmount

    useEffect(() => {
        if (reset) {
            setSeconds(timerAmount); // Reset to the timerAmount when the reset flag is true
        }
    }, [reset, timerAmount]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isRunning && !reset && seconds > 0) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => Math.max(prevSeconds - 1, 0)); // Decrease seconds, not below 0
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning, reset, seconds]);

    return seconds;
};
