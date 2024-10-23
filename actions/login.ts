"use server"
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByUsername } from "../data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const Login = async  (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { username, password } = validatedFields.data;

    const existingUser = await getUserByUsername(username);
    
    
    if (!existingUser || !existingUser.username || !existingUser.password) {
        return { error: "Invalid credentials!" }
    }

    if (!existingUser.emailVerified ) {
        const verificationToken = await generateVerificationToken(existingUser.username);
        
        if (verificationToken) {
            await sendVerificationEmail(
                verificationToken.email,
                verificationToken.token,
            )    
            return {success: "Confirmation email sent!"}
        }
      
       
    }

    try {
        await signIn("credentials", {
            username,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT_URL
        
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