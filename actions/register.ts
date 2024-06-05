"use server"

// import prisma from "@/lib/db"
import * as z from "zod";
import bcrypt from "bcrypt";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail, getUserByUsername } from "../data/user";
import { prisma } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const Register = async  (values: z.infer<typeof RegisterSchema>) => {
    
    const result = RegisterSchema.safeParse(values);

    if (!result.success) {
        return { error: result.error.message };
    }

    const { name, email, username, password } = values;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingEmail = await getUserByEmail(email);

    const existingUser = await getUserByUsername(username);

    if (existingEmail) {
        return {error: "Email already in use!"}
    } 

    if (existingUser) {
        return {error: "That username is taken!"}
    } 
    
    try {
        await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                name,
            },
        });

        const verificationToken = await generateVerificationToken(email);

        if (verificationToken) {
            await sendVerificationEmail(
                verificationToken.email,
                verificationToken.token,
            )
        } else {
            console.error('Error sending email.');

            return { error: "Error sending verification email." };
        }

    } catch (error) {
        console.error('Error creating user:', error);
        return { error: 'Error creating user.' };
    }

    return { success: "Confirmation Email Sent!" };
}