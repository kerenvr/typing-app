import { prisma } from "@/lib/db";

export const getVerificationTokenByToken = async (
    token: string,
    email: string
) => {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { 
                email_token: {
                    email,
                    token,
                  },
            }
        });
    return verificationToken;
    } catch (error) {
        return null;
    }
}


export const getVerificationTokenByEmail = async (
    email: string
) => {
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where: { email }
        });
    return verificationToken;
    } catch (error) {
        return null;
    }
}
