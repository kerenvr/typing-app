"use server"

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt";
import { findUserByEmail } from "../data/user";
import { prisma } from '@/lib/db';

export const Register = async  (values: z.infer<typeof RegisterSchema>) => {
    const result = RegisterSchema.safeParse(values);

    if (!result.success) {
        return { error: result.error.message };
    }

    const { name, email, password } = values;

    const hashedPassword = await bcrypt.hash(password, 10);
    const existingEmail = await findUserByEmail(email);

    if (existingEmail) {
        return {error: "Email already in use!"}
    } 


    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })
    } catch (error) {
        return { error: 'Error creating user.' };
    }


    return { success: "Success!" };
}