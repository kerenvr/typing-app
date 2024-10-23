import { prisma } from "@/lib/db";

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