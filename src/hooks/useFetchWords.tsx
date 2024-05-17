import { useState, useEffect } from "react";
import { fetchWords } from '@/utils/fetchWords';

export const useFetchWords = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [words, setWords] = useState<string>('');

    useEffect(() => {
        let isCancelled = false;

        const getWords = async () => {
            setIsLoading(true);
            const { tempArray } = await fetchWords();
            const joinedWords = tempArray.join(' ');

            if (!isCancelled) {
                setWords(joinedWords);
                setIsLoading(false);
            }
        };

        getWords();
        
        return () => {
            isCancelled = true;
        };
    }, []);

    return { isLoading, words };
};
