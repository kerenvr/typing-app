import { prisma } from "@/lib/db";

interface WpmData {
    wpm: number;
    userId: string;
}

export const saveWPM = async (wpmData: WpmData) => {
    const { wpm, userId } = wpmData;
    try {
        const result = await prisma.typingSpeed.create({
            data: {
                wpm: wpm,
                userId: userId,
                createdAt: new Date(),
            },
        });

        console.log('WPM saved successfully:', result);
    } catch (error) {
        console.error('Error saving WPM:', error);
    }
};
