"use server";

import * as z from "zod";

import { UpdateProfileSchema } from "@/schemas";
import { prisma } from "@/lib/db";
import { getUserById } from "../data/user";
import { currentUser } from "@/lib/auth";

export const Update = async (values: z.infer<typeof UpdateProfileSchema>) => {
    const validFields = UpdateProfileSchema.safeParse(values);

    if (!validFields.success) {
        return { error: "Invalid fields!" };
    }

    const user = await currentUser();

    if (!user) { return { error: "Unauthorized." }; }

    if (!user.id) return { error: "Unauthorized" };

    const dbUser = await getUserById(user.id);

    if (!dbUser) { return  { error: "Unauthorized." }; }

    await prisma.user.update({
        where: { id: dbUser.id },
        data: {
            ...values,
        },
    })


    return { success: "Your profile has been updated." };
} 