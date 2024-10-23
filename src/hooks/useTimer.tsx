import { useState, useEffect } from "react";

export const useTimer = (isRunning: boolean, reset: boolean): number => {
    const [seconds, setSeconds] = useState(0);
    
    useEffect(() => {
        if (reset) {
            setSeconds(0); // Reset the seconds when the reset flag is true
        }
    }, [reset]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (isRunning && !reset) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning, reset]);
    
    return seconds;
}
