import { useState, useEffect } from "react";

export const useTimer = (isRunning: boolean, reset: boolean, timerAmount: number): number => {
    const [seconds, setSeconds] = useState(timerAmount); // Initialize with timerAmount

    // Effect to handle reset and initial timerAmount
    useEffect(() => {
        if (reset) {
            setSeconds(timerAmount); // Reset to the timerAmount when the reset flag is true
        } else {
            setSeconds(timerAmount); // Update seconds when timerAmount changes
        }
    }, [reset, timerAmount]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (isRunning && seconds > 0) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => Math.max(prevSeconds - 1, 0)); // Decrease seconds, not below 0
            }, 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning, seconds]); // Keep seconds in dependency to stop when it reaches 0

    return seconds;
};
