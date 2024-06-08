"use server";

import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";
import { getPasswordResetTokenByToken } from "../data/password-reset-token";
import { getUserByEmail } from "../data/user";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/db";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null,
    ) => {

    if (!token) {
        return { error: "Invalid token!" };
    }

    const validFields = NewPasswordSchema.safeParse(values);

    if (!validFields.success) {
        return { error: "Invalid fields!" };
    }

    const { password } = validFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return { error: "Invalid token!" };
    }

    const hasExpired = new Date() > new Date(existingToken.expires);

    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Something went wrong!" };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    try {
        await prisma.user.update({
            where: { id: existingUser.id },
            data: { password: hashedPassword },
        });
    } catch (error) {
        return { error: "Error updating password!" };
    }

    await prisma.passwordResetToken.delete({
        where: { id: existingToken.id },
    })

    return { success: "Password reset successful!" };
}