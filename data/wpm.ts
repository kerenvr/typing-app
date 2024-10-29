import { prisma } from '@/lib/db';

export const getWpm = async (userId: string) => {
    try {
        const wpmRecords = await prisma.wpm.findMany({
            where: {
                userId: userId, // Filter by user ID
            },
        });
        return wpmRecords; // Return the fetched records

    } catch (error) {
        console.error("Error fetching WPM:", error);
        return null; // Return null or handle the error as needed
    }

    
};

export const getWordsByDifficulty = async (difficulty: string) => {
    try {
        const words = await prisma.wordBank.findMany({
            where: { difficulty: difficulty }
        });
        return words;
    } catch (error) {
        console.error("Error fetching words:", error);
        return null; // Return null or handle the error as needed
    }
};