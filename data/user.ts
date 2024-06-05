import { prisma } from '@/lib/db'

export const findUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    } catch {
        return null;
    }
}

export const findUserByUsername = async (username: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        return user;
    } catch {
        return null;
    }
}

export const findUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    } catch (error) {
        console.error('Error fetching user by id:', error);
        return null;
    }
}
       