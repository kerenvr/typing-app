"use server";

import * as z from "zod";

import { UpdateProfileSchema } from "@/schemas";

export const Update = async (values: z.infer<typeof UpdateProfileSchema>) => {
    const validFields = UpdateProfileSchema.safeParse(values);

    if (!validFields.success) {
        return { error: "Invalid email!" };
    }

    const { name, username, email  } = validFields.data;


    return { success: "If the email address you provided is registered, you will receive password reset instructions shortly." };
} 