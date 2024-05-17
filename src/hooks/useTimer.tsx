import { useState, useEffect } from "react";

export const useTimer = (isRunning: boolean): number => {
    const [seconds, setSeconds] = useState(0);
    
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
    
    return seconds;
}