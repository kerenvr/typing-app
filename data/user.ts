import { prisma } from '@/lib/db'

export const getUserByEmail = async (email: string) => {
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

export const getUserByUsername = async (username: string) => {
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

export const getUserById = async (id: string) => {
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
       