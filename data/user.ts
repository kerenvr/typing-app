import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
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
    } catch {
        return null;
    }
}
       