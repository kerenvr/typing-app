"use server"

// import prisma from "@/lib/db"
import * as z from "zod";
import bcrypt from "bcrypt";
import { UpdatePasswordSchema } from "@/schemas";
import { prisma } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "../data/user";

export const UpdatePassword = async  (values: z.infer<typeof UpdatePasswordSchema>) => {
    const result = UpdatePasswordSchema.safeParse(values);

    if (!result.success) {
        return { error: result.error.message };
    }

    const user = await currentUser();
    if (!user) { return { error: "Unauthorized." }; } //no session found

    if (!user.id) return; //user id not found in databse
    const dbUser = await getUserById(user.id); //get the user id
    if (!dbUser) { return  { error: "Unauthorized." }; } //user not found in databse


    const { currPassword, newPassword, repeatNewPassword } = values;

    if (dbUser.password) {
        const passwordMatch = await bcrypt.compare(currPassword, dbUser.password);
        if (!passwordMatch) {
            return { error: "Incorrect current password!" };
        }
    }

    if (newPassword !== repeatNewPassword) {
        return { error: "Passwords do not match!" };
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    
    try {
        await prisma.user.update({
            where: {
                id: dbUser.id,
            },
            data: {
                password: hashedPassword,
            },
        });

    } catch (error) {
        return { error: 'Error changing password.' };
    }

    return { success: "Password updated!" };
}