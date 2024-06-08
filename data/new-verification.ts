"use server";

import { prisma } from "@/lib/db";
import { getUserByEmail } from "./user";
import { getVerificationTokenByToken } from "./verification-token";

export const NewVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return {error: "Invalid token!"};
    }

    const tokenExpired = new Date(existingToken.expires) < new Date();

    if (tokenExpired) {
        return {error: "Token has expired!"}
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return {error: "User not found!"};
    }

    await prisma.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        }
    })

    await prisma.verificationToken.delete({
        where: {
            id: existingToken.id,
        }
    })

    return {success: "Email verified!"};
}