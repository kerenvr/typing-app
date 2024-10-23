"use server";

import * as z from "zod";

import { UpdateProfileSchema } from "@/schemas";
import { prisma } from "@/lib/db";
import { getUserByEmail, getUserById, getUserByUsername } from "../data/user";
import { currentUser } from "@/lib/auth";

export const Update = async (values: z.infer<typeof UpdateProfileSchema>) => {
    const validFields = UpdateProfileSchema.safeParse(values);

    const { email, username } = values; //destructure email and username from values

    if (!validFields.success) { //validation of fields failed
        return { error: "Invalid fields!" };
    }

    //current user returns the session.user of await auth()
    const user = await currentUser();
    if (!user) { return { error: "Unauthorized." }; } //no session found

    if (!user.id) return; //user id not found in databse
    const dbUser = await getUserById(user.id); //get the user id
    if (!dbUser) { return  { error: "Unauthorized." }; } //user not found in databse


    //if there is a user input a new username
    if (username) {
        //will take the username they input, check the database and try to get 
        //the user by the username, and if there is a user with that username
        //it will say "That username is taken!" if the username they put
        //is their current username, it will also return an error
        const existingUser = await getUserByUsername(username);
        if (username === user.username ) return {error: "You already have that username!"};
        if (existingUser) return {error: "That username is taken!"}; 
    }


    //same logic as username
    if (email) {
        const existingEmail = await getUserByEmail(email);
        if (email === user.email) return {error: "You already have that email!"};
        if (existingEmail) return {error: "That email is taken!"};
    }


    //update user and only pass in the values that they input (...values)
    await prisma.user.update({
        where: { id: dbUser.id },
        data: {
            ...values,
        },
    })


    return { success: "Your profile has been updated." };
} 