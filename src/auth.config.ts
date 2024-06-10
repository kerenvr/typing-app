import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "@/schemas"
import { getUserByUsername } from "../data/user";
import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
 
export default { 
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials: Partial<Record<string, unknown>>) {
                //make sure fields are valid
                const validatedFields = LoginSchema.safeParse(credentials);
                //if they are valid, then proceed, else return null
                if (validatedFields.success) {
                    const { username, password } = validatedFields.data;
                    const user = await getUserByUsername(username); //find user by username

                    if (!user || !user.password) return null; //user does not exist

                    //user exists, then check passwords
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    //return user finally if user exists and passwords match
                    if (passwordsMatch) return user;
                }
                return null; //passwords do not match
            }
        })
    ], 
} satisfies NextAuthConfig