"use server"

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { findUserByEmail } from "../data/user";

export const Login = async  (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await findUserByEmail(email);
    
    
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Invalid credentials!" }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: '/typing'
        
        })

    } catch (error) {
        if (error instanceof AuthError) {
            switch(error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default: return { error : "Something went wrong!" }
            }
        }
        throw error;
    }
};