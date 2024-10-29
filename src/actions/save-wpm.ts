import { prisma } from '@/lib/db';
import { getWpm } from '../../data/wpm';

interface Wpm {
    userId: string;
    wpm: number;
    difficulty: number;
    time: number;
}

export const saveWpm = async (values: Wpm) => {
    await prisma.wpm.create({
        data: {
            userId: values.userId,
            wpm: values.wpm,
            difficulty: values.difficulty,
            time: values.time
        }
    });
};

export const retreiveWpm = async (userId: string) => {
    const wpm = await getWpm(userId)
    console.log(wpm)
}

