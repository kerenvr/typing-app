"use server"

// import prisma from "@/lib/db"
import * as z from "zod";
import bcrypt from "bcrypt";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail, getUserByUsername } from "../data/user";
import { prisma } from "@/lib/db";

export const Register = async  (values: z.infer<typeof RegisterSchema>) => {
    const response = await prisma.user.findMany();
    console.log(response);

    const result = RegisterSchema.safeParse(values);

    if (!result.success) {
        return { error: result.error.message };
    }

    const { email, username, password } = values;
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
            },
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return { error: 'Error creating user.' };
    }

    return { success: "Success!" };
}